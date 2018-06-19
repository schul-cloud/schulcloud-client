# Schul-Cloud Client  
_An implementation of the Schul-Cloud client with NodeJS and Express._  
  
Dev: ![Travis Status](https://travis-ci.org/schul-cloud/schulcloud-client.svg?branch=master)<br>  
Production: ![Travis Status](https://travis-ci.org/schul-cloud/schulcloud-client.svg?branch=production)  
  
## Requirements  
  
* node.js 6 or later (You can install it from https://nodejs.org/en/download/)  
  
## Setup  
  
There are blog posts on how to setup [client](https://github.com/schul-cloud/schulcloud-client) and [server](https://github.com/schul-cloud/schulcloud-server) under [Windows](https://schul-cloud.github.io/blog/2017-05-18/setup-schul-cloud-client-and-sever-under-windows) and [Linux](https://schul-cloud.github.io/blog/2017-04-21/setup-development-under-ubuntu).  
  
1. Clone directory into local folder  
2. Go into the cloned folder and enter `npm install`  
3. Install nodemon and gulp globally by entering `npm install -g nodemon gulp`  
  
## Run  
  
1. Start the [schul-cloud server](https://github.com/schulcloud/schulcloud-server)  
2. Go into project folder
3. run `gulp watch` to run gulp
4. Set the ENV-variable `TZ=Europe/Berlin` (for windows use `set TZ=Europe/Berlin`)
5. run `npm run watch` to boot the application
6. go to `http://localhost:3100`
  
For connecting to the [SchulCloud Calendar-Service](https://github.com/schul-cloud/schulcloud-calendar) you have to set `export CALENDAR_SERVICE_ENABLED=true`.  
  
For connecting to the [SchulCloud Notification-Service](https://github.com/schul-cloud/node-notification-service) you have to set `export NOTIFICATION_SERVICE_ENABLED=true`.  
  
For activating Google Analytics tracking you have to set `export GOOGLE_ANALYTICS_TRACKING_ID={TRACKING_ID}`.  
  
## Theming  
  
Add Themes to /theme directory. Call gulp and node with SC_THEME set to name of directory.  
then clear build files and gulp cache with `gulp clear`  
  
### Windows  
  run `set SC_THEME={themeName}` without spaces around the equal sign!  
  
## Testing  
  
**Information**: Please make sure that all your changes works on [Chrome](https://www.google.de/chrome/browser/desktop/index.html) , [Firefox](https://www.mozilla.org/de/firefox/new/) and [Safari](https://www.apple.com/de/safari/)!  
For html/css components please check [caniuse](https://caniuse.com/).  
  
1. Set the password for the demo user `schueler@schul-cloud.org`  
  Ubuntu/Mac: `export SC_DEMO_USER_PASSWORD={PASSWORD}` (Without braces)  
    Windows: `set SC_DEMO_USER_PASSWORD={PASSWORD}` (Without braces)  
2. run `npm run test`  
3. If you want to use another backend url than localhost, set the `BACKEND_URL` and `PUBLIC_BACKEND_URL` environment variables (see 1)  
4. If you want to list the coverage, run `npm run coverage`  

---
**Frontend Testing**
We are currently using [nightwatch.js](http://nightwatchjs.org) for frontend testing. The current api documentation can be found [here](http://nightwatchjs.org/api).
1. Start a client server with `npm run watch`
2. Open another command line and type `npm run frontendTests` to run tests against chrome and firefox.

In case you want browser specific tests use: `./node_modules/.bin/nightwatch --config nightwatch.conf.js --env chrome` or switch chrome with firefox.

Adding new tests:
1. Copy any of the existing tests
2. First test cases should be essentially the same, login, checkups, ...
3. Add your test cases in between the checkups and the `browser.end()`

Add your test to `diff.sh`:
`diff.sh` compares the PR Branch with the Master Branch and then adds the tests in case any files where changed for which a test exists.


## Documentation
 - [.critical.scss - why? above the fold optimization](https://docs.schul-cloud.org/display/SCDOK/Above+the+Fold+optimization).

## How to name your branch  
  
1. Take the last part of the url of your Trello ticket (e.g. "8-setup-feathers-js")  
2. Name the branch after the Trello id (e.g. "8-setup-feathers-js")  
  
## Commiting  
  
Default branch: master  
  
1. Go into project folder  
2. Run the tests (see above)  
3. Commit with a meanigful commit message(!) even at 4 a.m. and not stuff like "dfsdfsf"  
4. Checkout to master branch  
5. Run `git pull`  
6. Checkout to the branch you want to upload  
7. run `git rebase -p develop` (not `git merge`!) and solve merge conflicts if needed  
8. run `git push`
