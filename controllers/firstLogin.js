const express = require('express');
const router = express.Router();

const authHelper = require('../helpers/authentication');
const permissionsHelper = require('../helpers/permissions');
const api = require('../api');

// secure routes
router.use(authHelper.authChecker);

router.get('/', function (req, res, next) {
    res.render('firstLogin/firstLogin', {
        title: 'Willkommen - Erster Login',
        hideMenu: true
    });
});
router.get('/14_17', function (req, res, next) {
    res.render('firstLogin/firstLogin14_17', {
        title: 'Willkommen - Erster Login (14 bis 17 Jahre)',
        hideMenu: true
    });
});
router.get('/U14', function (req, res, next) {
    res.render('firstLogin/firstLoginU14', {
        title: 'Willkommen - Erster Login',
        hideMenu: true
    });
});
router.get('/UE18', function (req, res, next) {
    res.render('firstLogin/firstLoginUE18', {
        title: 'Willkommen - Erster Login',
        hideMenu: true
    });
});
router.get('/existing', function (req, res, next) {
    res.render('firstLogin/firstLoginExistingUser', {
        title: 'Willkommen - Erster Login für bestehende Nutzer',
        hideMenu: true
    });
});
router.post('/submit', function (req, res, next) {

    if(req.body["password-1"] != req.body["password-2"]){
        return Promise.reject("Die neuen Passwörter stimmen nicht überein.")
        .catch(err => {
            res.status(500).send(err);
        });
    }

    let accountId = res.locals.currentPayload.accountId
    let accountUpdate = {};
    let accountPromise = Promise.resolve();
    let userUpdate = {};
    let userPromise = Promise.resolve();
    let consentUpdate = {};
    let consentPromise = Promise.resolve();

    if (req.body["password-1"]) {
        accountUpdate.password_verification = req.body.password_verification;
        accountUpdate.password = req.body["password-1"];
        accountPromise = api(req).patch('/accounts/' + accountId, {
            json: accountUpdate
        });
    };

    if (req.body["student-email"]) userUpdate.email = req.body["student-email"];
    if (req.body.studentBirthdate) userUpdate.birthday = new Date(req.body.studentBirthdate);
    var preferences = res.locals.currentUser.preferences || {};
    //preferences.firstLogin = true;
    userUpdate.preferences = preferences;

    userPromise = api(req).get('/users/', {
        qs: {children: res.locals.currentPayload.userId}
    }).then(parents => {
        userUpdate.parents = parents.data.map(parent => {
            return parent._id
        });
        return api(req).patch('/users/' + res.locals.currentPayload.userId, {
            json: userUpdate
        });
    })

    if (req.body.Erhebung) {
        consentPromise = api(req).get('/consents/', {
            qs: {userId: res.locals.currentPayload.userId}
        }).then(consent => {
            consentUpdate.form = 'digital';
            consentUpdate.privacyConsent = req.body.Erhebung;
            consentUpdate.thirdPartyConsent = req.body.Pseudonymisierung;
            consentUpdate.termsOfUseConsent = req.body.Nutzungsbedingungen;
            consentUpdate.researchConsent = req.body.Forschung;
            return api(req).patch('/consents/' + consent.data[0]._id, {
                json: {userConsent: consentUpdate}
            });
        })
        
    }

    return Promise.all([accountPromise, userPromise, consentPromise]).then(() => {
        if (req.body["sendCredentials"]){
            return api(req).post('/mails/', {
                json: { email: res.locals.currentUser.email,
                        subject: `Willkommen in der ${res.locals.theme.title}!`,
                        headers: {},
                        content: {
                            "text": `Hallo ${res.locals.currentUser.displayName}

mit folgenden Anmeldedaten kannst du dich in der ${res.locals.theme.title} einloggen:

Adresse: ${req.headers.origin || process.env.HOST}
E-Mail: ${res.locals.currentUser.email}
Passwort: ${req.body["password-1"]}

Viel Spaß und einen guten Start wünscht dir dein
${res.locals.theme.short_title}-Team`,
                            "html": ""
                        }
                }
            });
        } 

        res.sendStatus(200);

    }).catch(err => {
        err.text = err.error.message? err.error.message: err;
        res.status(500).send(err.text);
    });
});
router.get('/existingU14', function (req, res, next) {
    res.render('firstLogin/firstLoginExistingUserU14', {
        title: 'Willkommen - Erster Login für bestehende Nutzer',
        hideMenu: true
    });
});
router.get('/existingUE14', function (req, res, next) {
    res.render('firstLogin/firstLoginExistingUserUE14', {
        title: 'Willkommen - Erster Login für bestehende Nutzer',
        hideMenu: true
    });
});

module.exports = router;
