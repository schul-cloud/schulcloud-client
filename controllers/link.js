const express = require('express');
const router = express.Router();
const api = require('../api');
const logger = require('../helpers/logger')

router.post('/', function (req, res, next) {
    // check first if target already exists (preventing db to be wasted)
    let target = `${(req.headers.origin || process.env.HOST)}/${req.body.target}`;
    api(req).get("/link/", { qs: { target: target } }).then(result => {
        let existingLink = result.data[0];
        if (!existingLink) {
            api(req).post("/link/", { json: { target: target } }).then(data => {
                data.newUrl = `${(req.headers.origin || process.env.HOST)}/link/${data._id}`;
                res.json(data);
            });
        } else {
            existingLink.newUrl = `${(req.headers.origin || process.env.HOST)}/link/${existingLink._id}`;
            res.json(existingLink);
        }
    }).catch(err => next(err));
});

// handles redirecting from client
router.get('/:id', function (req, res, next) {
    if (!req.params || !req.params.id) {
        return res.send(400);
    }
    const customError = { message: 'Der Link ist nicht gültig oder abgelaufen. Bitte überprüfe den Link oder lasse dir einen neuen Link erstellen.', statusCode: 404 };
    return api(req).get(`/link/${req.params.id}?includeShortId=true&redirect=false`)
        .then(result => {
            if (result.target) {
                return res.redirect(result.target)
            } else {
                return next(customError);
            }
        }).catch(err => {
            if (err && err.error && err.error.code === 404) {
                logger.error('invalid link has been requested', err);
                return next(customError);
            }
            return next(err);
        });
});

module.exports = router;
