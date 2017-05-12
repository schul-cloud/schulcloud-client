'use strict';

const assert = require('assert');
const app = require('../../app');
const chai = require('chai');
const expect = chai.expect;
const chaiHttp = require('chai-http');
const loginHelper = require('../helper/login-helper');
chai.use(chaiHttp);

describe('Calendar tests', function () {
    this.timeout(10000);
    before(function (done) {
        this.server = app.listen(3031);
        this.server.once('listening', () => {
            loginHelper.login(app).then(res => {
                this.agent = res.agent;
                done();
            });
        });
    });

    after(function (done) {
        this.server.close(done);
    });

    it('GET /calendar', function () {
        return new Promise((resolve, reject) => {
            this.agent
                .get('/calendar/')
                .end((err, res) => {
                    expect(res.statusCode).to.equal(200);
                    expect(res.text).to.contain('Kalender');
                    resolve();
                });
        });
    });
});
