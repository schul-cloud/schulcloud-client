const autoprefixer = require('autoprefixer');
const fs = require('fs');
const gulp = require('gulp');
const babel = require('gulp-babel');
const changed = require('gulp-changed-smart');
const cleanCSS = require('gulp-clean-css');
const concat = require('gulp-concat');
const count = require('gulp-count');
const filelog = require('gulp-filelog');
const header = require('gulp-header');
const gulpif = require('gulp-if');
const imagemin = require('gulp-imagemin');
const optimizejs = require('gulp-optimize-js');
const plumber = require('gulp-plumber');
const postcss = require('gulp-postcss');
const rimraf = require('gulp-rimraf');
const sass = require('gulp-sass');
const sassGrapher = require('gulp-sass-grapher');
const sourcemaps = require('gulp-sourcemaps');
const uglify = require('gulp-uglify');
const path = require('path');
const map = require('vinyl-map');
const named = require('vinyl-named');
const webpack = require('webpack');
const webpackStream = require('webpack-stream');
const webpackConfig = require('./webpack.config');
const workbox = require('workbox-build');

const baseScripts = [
  './static/scripts/jquery/jquery.min.js',
  './static/scripts/jquery/jquery.serialize-object.js',
  './static/scripts/tether/tether.min.js',
  './static/scripts/bootstrap/bootstrap.min.js',
  './static/scripts/chosen/chosen.jquery.min.js',
  './static/scripts/base.js',
  './static/scripts/toggle/bootstrap-toggle.min.js',
  './static/scripts/mailchimp/mailchimp.js',
  './static/scripts/qrcode/kjua-0.1.1.min.js'
];

const nonBaseScripts = ['./static/scripts/**/*.js', '!./static/scripts/sw/workbox/*.*']
  .concat(baseScripts.map(script => '!' + script));
//used by all gulp tasks instead of gulp.src(...)
//plumber prevents pipes from stopping when errors occur
//changed only passes on files that were modified since last time
//filelog logs and counts all processed files

function withTheme(src) {
  if (typeof src == "string") {
    return [src, `./theme/${themeName()}/${src.slice(2)}`];
  } else {
    return src.concat(src.map(e => {
      return `./theme/${themeName()}/${e.slice(2)}`;
    }));
  }
}

const beginPipe = src =>
  gulp.src(withTheme(src))
  .pipe(plumber())
  .pipe(changed(gulp))
  .pipe(filelog());

const beginPipeAll = src =>
  gulp.src(withTheme(src))
  .pipe(plumber())
  .pipe(filelog());

function themeName() {
  return process.env.SC_THEME || 'default';
}
//minify images
gulp.task('images', () => {
  beginPipe('./static/images/**/*.*')
    .pipe(imagemin())
    .pipe(gulp.dest(`./build/${themeName()}/images`));
});

//minify static/other
gulp.task('other', () => {
  gulp.src('./static/other/**/*.*')
    .pipe(gulp.dest(`./build/${themeName()}/other`));
});

var loadPaths = path.resolve('./static/styles/');
sassGrapher.init('./static/styles/', {
  loadPaths: loadPaths
});
var firstRun = true;
gulp.task('styles', () => {
  var themeFile = `./theme/${themeName()}/style.scss`;
  beginPipe('./static/styles/**/*.{css,sass,scss}')
    .pipe(gulpif(!firstRun, sassGrapher.ancestors()))
    .pipe(header(fs.readFileSync(themeFile, 'utf8')))
    .pipe(filelog("PROCESS: "))
    .pipe(sourcemaps.init())
    .pipe(sass({
      sourceMap: true
    }))
    .pipe(postcss([
      autoprefixer({
        browsers: ['last 3 version']
      })
    ]))
    .pipe(cleanCSS({
      compatibility: 'ie9'
    }))
    .pipe(sourcemaps.write('./sourcemaps'))
    .pipe(gulp.dest(`./build/${themeName()}/styles`));
  firstRun = false;
});

//copy fonts
gulp.task('fonts', () => {
  beginPipe('./static/fonts/**/*.*')
    .pipe(gulp.dest(`./build/${themeName()}/fonts`));
});

//compile/transpile JSX and ES6 to ES5 and minify scripts
gulp.task('scripts', () => {
  beginPipeAll(nonBaseScripts)
    .pipe(named(
      file => {
        // As a preparation for webpack stream: Transform nonBaseScripts paths
        // e.g. "/static/scripts/schics/schicEdit.blub.min.js" -> "schics/schicEdit.blub.min"
        const initialPath = file.history[0].split("scripts")[1];
        const pathSegments = initialPath.split(".");
        const concretePath = pathSegments.slice(0, pathSegments.length - 1).join(".");
        const fileName = concretePath.split("").slice(1).join("");

        return fileName;
      }
    ))
    .pipe(webpackStream(webpackConfig, webpack))
    .pipe(gulp.dest(`./build/${themeName()}/scripts`))
});


//compile/transpile JSX and ES6 to ES5, minify and concatenate base scripts into all.js
gulp.task('base-scripts', () => {
  beginPipeAll(baseScripts)
    .pipe(count('## js-files selected'))
    .pipe(babel({
      presets: [
        ["es2015", {
          "modules": false
        }]
      ],
    }))
    .pipe(optimizejs())
    .pipe(uglify())
    .pipe(concat('all.js'))
    .pipe(gulp.dest(`./build/${themeName()}/scripts`));
});

//compile vendor SASS/SCSS to CSS and minify it
gulp.task('vendor-styles', () => {
  beginPipe('./static/vendor/**/*.{css,sass,scss}')
    .pipe(sourcemaps.init())
    .pipe(sass({
      sourceMap: true
    }))
    .pipe(postcss([
      autoprefixer({
        browsers: ['last 3 version']
      })
    ]))
    .pipe(cleanCSS({
      compatibility: 'ie9'
    }))
    .pipe(sourcemaps.write('./sourcemaps'))
    .pipe(gulp.dest(`./build/${themeName()}/vendor`));
});

//compile/transpile vendor JSX and ES6 to ES5 and minify scripts
gulp.task('vendor-scripts', () => {
  beginPipe('./static/vendor/**/*.js')
    .pipe(babel({
      compact: false,
      presets: [
        ["es2015", {
          modules: false
        }]
      ],
      plugins: ["transform-react-jsx"]
    }))
    .pipe(optimizejs())
    .pipe(uglify())
    .pipe(gulp.dest(`./build/${themeName()}/vendor`));
});

//copy other vendor files
gulp.task('vendor-assets', () => {
  beginPipe(['./static/vendor/**/*.*', '!./static/vendor/**/*.js',
      '!./static/vendor/**/*.{css,sass,scss}'
    ])
    .pipe(gulp.dest(`./build/${themeName()}/vendor`));
});

gulp.task('sw-workbox', () => {
  beginPipe(['./static/scripts/sw/workbox/*.js'])
    .pipe(gulp.dest(`./build/${themeName()}/scripts/sw/workbox`));
});

let globPatterns = [
    'fonts/**/*.{woff,css}',
    'images/logo/*.svg',
    'images/footer-logo.png',
    'scripts/all.js',
    'scripts/loggedin.js',
    'scripts/sw/metrix.js',
    'scripts/calendar.js',
    'scripts/dashboard.js',
    'scripts/news.js',
    'styles/lib/*.css',
    'styles/lib/toggle/*.min.css',
    'styles/lib/datetimepicker/*.min.css',
    'styles/calendar/*.css',
    'styles/news/*.css',
    'styles/dashboard/*.css',
    'vendor/introjs/intro*.{js,css}'
  ];

gulp.task('generate-service-worker', () => {
    return workbox.injectManifest({
      globDirectory: `./build/${themeName()}/`,
      globPatterns: globPatterns,
      swSrc: './static/sw.js',
      swDest: `./build/${themeName()}/sw.js`,
      templatedUrls: {
        '/calendar/': [
          '../../views/calendar/calendar.hbs',
         ]
      },
    })
    .then(({count, size, warnings}) => {
        // Optionally, log any warnings and details.
        warnings.forEach(console.warn);
        console.log(`${count} files will be precached, totaling ${size} bytes.`);
        })
    .catch((error) => {
        console.warn('Service worker generation failed:', error);
    });
  });  

//clear build folder + smart cache
gulp.task('clear', () => {
  gulp.src(['./build/*', './.gulp-changed-smart.json', './.webpack-changed-plugin-cache/*'], { 
      read: false
    })
    .pipe(rimraf());
});

//run all tasks, processing changed files
gulp.task('build-all', ['images', 'other', 'styles', 'fonts', 'scripts', 'base-scripts',
                        'vendor-styles', 'vendor-scripts', 'vendor-assets', 'generate-service-worker', 'sw-workbox'
]);

gulp.task('build-theme-files', ['styles']);

//watch and run corresponding task on change, process changed files only
gulp.task('watch', ['build-all'], () => {
  gulp.watch(withTheme('./static/images/**/*.*'), ['images']);
  gulp.watch(withTheme('./static/other/**/*.*'), ['other']);
  gulp.watch(withTheme('./static/styles/**/*.{css,sass,scss}'), ['styles']);
  gulp.watch(withTheme('./static/fonts/**/*.*'), ['fonts']);
  gulp.watch(withTheme(nonBaseScripts), ['scripts']);
  gulp.watch(withTheme(baseScripts), ['base-scripts']);
  gulp.watch(withTheme('./static/vendor/**/*.{css,sass,scss}'), ['vendor-styles']);
  gulp.watch(withTheme('./static/vendor/**/*.js'), ['vendor-scripts']);
  gulp.watch(['./static/vendor/**/*.*', '!./static/vendor/**/*.js',
    '!./static/vendor/**/*.{css,sass,scss}'
  ], ['vendor-assets']);
  gulp.watch(withTheme('./static/sw.js'), ['generate-service-worker']);
  gulp.watch(withTheme('./static/scripts/sw/workbox/*.*'), ['sw-workbox']);
});

//run this if only "gulp" is run on the commandline with no task specified
gulp.task('default', ['build-all']);
