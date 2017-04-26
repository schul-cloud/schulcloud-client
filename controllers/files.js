/*
 * One Controller per layout view
 */

const fs = require('fs');
const path = require('path');
const url = require('url');
const mime = require('mime');
const api = require('../api');
const rp = require('request-promise');
const express = require('express');
const router = express.Router();
const authHelper = require('../helpers/authentication');
const joinPath = require('path.join');
const multer  = require('multer');
const upload = multer({ storage: multer.memoryStorage() });

const getSignedUrl = (req, data) => {
    return api(req).post('/fileStorage/signedUrl', {
        json: data
    });
};

const changeQueryParams = (originalUrl, params = {}, pathname = '') => {
    const urlParts = url.parse(originalUrl, true);

    Object.keys(params).forEach(param => {
        urlParts.query[param] = params[param];
    });

    if(pathname) {
        urlParts.pathname = pathname;
    }

    delete urlParts.search;
    return url.format(urlParts);
};

const getBreadcrumbs = (req, {dir = '', baseLabel = '', basePath = '/files/'} = {}) => {
    let dirParts = '';
    const currentDir = dir || req.query.dir || '';
    const breadcrumbs = (currentDir.split('/') || []).filter(value => value).map(dirPart => {
        dirParts += '/' + dirPart;
        return {
            label: dirPart,
            url: changeQueryParams(req.originalUrl, {'dir': dirParts}, basePath)
        };
    });

    if (baseLabel) {
        breadcrumbs.unshift({
            label: baseLabel,
            url: changeQueryParams(req.originalUrl, {dir: ''}, basePath)
        });
    }

    return breadcrumbs;
};

const getStorageContext = (req, res, options = {}) => {

    if (req.query.storageContext) {
        return req.query.storageContext;
    }

    const currentDir = options.dir || req.query.dir || '';
    const urlParts = url.parse((options.url || req.originalUrl), true);

    let storageContext = urlParts.pathname.replace('/files/', '');

    if (storageContext === '') {
        storageContext = 'users/' + res.locals.currentUser._id;
    }

    return joinPath(storageContext, currentDir);
};


const FileGetter = (req, res, next) => {

    const currentDir = req.query.dir || '';
    const storageContext = getStorageContext(req, res);

    return api(req).get('/fileStorage', {
        qs: {storageContext}
    }).then(data => {
        let {files, directories} = data;

        files = files.map(file => {
            file.file = path.join(file.path, file.name);
            return file;
        });

        directories = directories.map(dir => {
            dir.url = changeQueryParams(req.originalUrl, {dir: path.join(currentDir, dir.name)});
            dir.path = path.join(storageContext, dir.name);
            return dir;
        });

        res.locals.files = {
            files,
            directories,
            storageContext
        };

        next();
    }).catch(err => {
        next(err);
    });
};

const getScopeDirs = (req, res, scope) => {
    return api(req).get('/' + scope + '/', {
        qs: {
            $or: [
                {userIds: res.locals.currentUser._id},
                {teacherIds: res.locals.currentUser._id}
            ]
        }
    }).then(records => {
        return records.data.map(record => {
            return Object.assign(record, {
                url: '/files/' + scope + '/' + record._id
            });
        });
    });
};


// secure routes
router.use(authHelper.authChecker);


// get signed url to upload file
router.post('/file', function (req, res, next) {
    const {type, name, dir = '', action = 'putObject'} = req.body;

    const data = {
        storageContext: getStorageContext(req, res, {url: req.get('Referrer'), dir}),
        fileName: name,
        fileType: (type || 'application/octet-stream'),
        action: action
    };

    getSignedUrl(req, data).then(signedUrl => {
        res.json({signedUrl});
    }).catch(err => {
        res.status((err.statusCode || 500)).send(err);
    });
});

// get signed url to upload file
router.post('/upload', upload.single('upload'), function (req, res, next) {
    const data = {
        storageContext: getStorageContext(req, {}, {}),
        fileName: req.file.originalname,
        fileType: (req.file.mimetype || 'application/octet-stream'),
        action: 'putObject'
    };

    getSignedUrl(req, data).then(signedUrl => {
        return rp.put({
            url: signedUrl.url,
            headers: Object.assign({}, signedUrl.header, {
                'content-type': req.file.mimetype
            }),
            body: req.file.buffer
        });
    }).then(_ => {
        res.json({
            "uploaded": 1,
            "fileName": req.file.originalname,
            "url": "/files/file?file=" + data.fileName + "&storageContext=" + data.storageContext
        });
    }).catch(err => {
        res.status((err.statusCode || 500)).send(err);
    });
});



// delete file
router.delete('/file', function (req, res, next) {
    const {name, dir = ''} = req.body;

    const data = {
        storageContext: getStorageContext(req, res, {url: req.get('Referrer'), dir}),
        fileName: name,
        fileType: null,
        action: null
    };

    api(req).delete('/fileStorage/', {
        qs: data
    }).then(_ => {
        res.sendStatus(200);
    }).catch(err => {
        res.status((err.statusCode || 500)).send(err);
    });
});


// get file
router.get('/file', function (req, res, next) {

    const {file, download = false} = req.query;

    const data = {
        storageContext: getStorageContext(req, res, {url: req.get('Referrer')}),
        fileName: file,
        fileType: mime.lookup(file),
        action: 'getObject'
    };

    getSignedUrl(req, data).then(signedUrl => {
        rp.get(signedUrl.url, {encoding: null}).then(awsFile => {
            if (download) {
                res.type('application/octet-stream');
                res.set('Content-Disposition', 'attachment;filename=' + path.basename(file));
            } else if (signedUrl.header['Content-Type']) {
                res.type(signedUrl.header['Content-Type']);
            }
            res.end(awsFile, 'binary');
        });
    }).catch(err => {
        res.status((err.statusCode || 500)).send(err);
    });
});


// create directory
router.post('/directory', function (req, res, next) {
    const {name, dir} = req.body;

    api(req).post('/fileStorage/directories', {
        json: {
            storageContext: getStorageContext(req, res, {url: req.get('Referrer'), dir}),
            dirName: name || 'Neuer Ordner'
        }
    }).then(_ => {
        res.sendStatus(200);
    }).catch(err => {
        res.status((err.statusCode || 500)).send(err);
    });
});

// delete directory
router.delete('/directory', function (req, res) {
    const {name, dir} = req.body;

    const data = {
        storageContext: dir
    };

    api(req).delete('/fileStorage/directories/', {
        qs: data
    }).then(_ => {
        res.sendStatus(200);
    }).catch(err => {
        res.status((err.statusCode || 500)).send(err);
    });
});


router.get('/', FileGetter, function (req, res, next) {
    res.render('files/files', Object.assign({
        title: 'Dateien',
        breadcrumbs: getBreadcrumbs(req, {
            baseLabel: 'Meine persönlichen Dateien'
        }),
        canUploadFile: true,
        canCreateDir: true,
        inline: req.query.inline || req.query.CKEditor,
        CKEditor: req.query.CKEditor
    }, res.locals.files));
});


router.get('/courses/', function (req, res, next) {
    const basePath = '/files/courses/';
    getScopeDirs(req, res, 'courses').then(directories => {
        const breadcrumbs = getBreadcrumbs(req, {basePath});

        breadcrumbs.unshift({
            label: 'Dateien aus meinen Fächern und Kursen',
            url: changeQueryParams(req.originalUrl, {dir: ''}, '/files/courses/')
        });

        res.render('files/files', {
            title: 'Dateien',
            breadcrumbs,
            files: [],
            directories
        });
    });
});


router.get('/courses/:courseId', FileGetter, function (req, res, next) {
    const basePath = '/files/courses/';
    api(req).get('/courses/' + req.params.courseId).then(record => {

        const breadcrumbs = getBreadcrumbs(req, {basePath: basePath + record._id});

        breadcrumbs.unshift({
            label: 'Dateien aus meinen Fächern und Kursen',
            url: req.query.CKEditor ? '#' : changeQueryParams(req.originalUrl, {dir: ''}, basePath)
        }, {
            label: record.name,
            url: changeQueryParams(req.originalUrl, {dir: ''}, basePath + record._id)
        });

        res.render('files/files', Object.assign({
            title: 'Dateien',
            canUploadFile: true,
            canCreateDir: true,
            inline: req.query.inline || req.query.CKEditor,
            CKEditor: req.query.CKEditor,
            breadcrumbs,
        }, res.locals.files));

    });
});


router.get('/classes/', function (req, res, next) {
    getScopeDirs(req, res, 'classes').then(directories => {
        const breadcrumbs = getBreadcrumbs(req);

        breadcrumbs.unshift({
            label: 'Dateien aus meinen Klassen',
            url: changeQueryParams(req.originalUrl, {dir: ''}, '/files/classes/')
        });

        res.render('files/files', {
            title: 'Dateien',
            breadcrumbs,
            files: [],
            directories
        });
    });
});


router.get('/classes/:classId', FileGetter, function (req, res, next) {
    const basePath = '/files/classes/';
    api(req).get('/classes/' + req.params.classId).then(record => {

        const breadcrumbs = getBreadcrumbs(req, {basePath});

        breadcrumbs.unshift({
            label: 'Dateien aus meinen Klassen',
            url: req.query.CKEditor ? '#' : changeQueryParams(req.originalUrl, {dir: ''}, basePath)
        }, {
            label: record.name,
            url: changeQueryParams(req.originalUrl, {dir: ''}, basePath + record._id)
        });

        res.render('files/files', Object.assign({
            title: 'Dateien',
            canUploadFile: true,
            breadcrumbs,
            inline: req.query.inline || req.query.CKEditor,
            CKEditor: req.query.CKEditor,
        }, res.locals.files));

    });
});


module.exports = router;
