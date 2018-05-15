/**
 * Testcases aimed at testing the authentication process.
 */
const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../server');

chai.should();
chai.use(chaiHttp);

// After successful registration we have a valid token. We export this token
// for usage in other testcases that require login.
let validToken;

describe('Registration', () => {
    it('should return a token when providing valid information', (done) => {

        chai.request(server)
            .post('/api/register')
            .send({
                "firstname": "bart",
                "lastname": "klomp",
                "email": "bartpklomp@banaan.com",
                "password": "banaan"
            })
            .end((err, res) => {
                res.should.have.status(200);
                res.body.should.be.a('object');
                let validToken = res.body.token;


                validToken.should.be.a('string')

                done()
            });
    });

    it('should return an error on GET request', (done) => {

        chai.request(server)
            .get('/api/register')
            .end((err, res) => {
                res.should.have.status(404)
                done()
            });
    });

    it('should throw an error when the user already exists', (done) => {
        chai.request(server)
            .post('/api/register')
            .send({
                "firstname": "string",
                "lastname": "string",
                "email": "bartpklomp@hotmail.com",
                "password": "string"
            })
            .end((err, res) => {
                res.should.have.status(401)
                done()
            });
    });

    it('should throw an error when no firstname is provided', (done) => {
        chai.request(server)
            .post('/api/register')
            .send({
                "lastname": "string",
                "email": "string",
                "password": "string"
            })
            .end((err, res) => {
                res.should.have.status(412)
                done()
            });
    });

    it('should throw an error when firstname is shorter than 2 chars', (done) => {
        chai.request(server)
            .post('/api/register')
            .send({
                "firstname": "a",
                "lastname": "string",
                "email": "bpk@gmail.com",
                "password": "string"

            })
            .end((err, res) => {
                res.should.have.status(412)
                done()
            });
    });

    it('should throw an error when no lastname is provided', (done) => {
        chai.request(server)
            .post('/api/register')
            .send({
                "firstname": "string",
                "email": "string",
                "password": "string"
            })
            .end((err, res) => {
                res.should.have.status(412)
                done()
            });
    });

    it('should throw an error when lastname is shorter than 2 chars', (done) => {
        chai.request(server)
            .post('/api/register')
            .send({
                "firstname": "string",
                "lastname": "a",
                "email": "bp@avans.nl",
                "password": "string"
            })
            .end((err, res) => {
                res.should.have.status(412)
                done()
            });
    });

    it('should throw an error when email is invalid', (done) => {
        chai.request(server)
            .post('/api/register')
            .send({
                "firstname": "string",
                "lastname": "a",
                "password": "string"
            })
            .end((err, res) => {
                res.should.have.status(412)
                done()
            });
    })

});

describe('Login', () => {

    it('should return a token when providing valid information', (done) => {
        chai.request(server)
            .post('/api/login')
            .send({
                "email": "bartpklomp@hotmail.com",
                "password": "banaan"
            })
            .end((err, res) => {
                res.should.have.status(200);
                res.body.should.be.a('object');
                let validToken = res.body.token;


                validToken.should.be.a('string');

                done()
            });
    });
    it('should throw an error when email does not exist', (done) => {
        //
        // Hier schrijf je jouw testcase.
        //
        chai.request(server)
            .post('/api/login')
            .send({
                "email": "ghdfsa@email.com",
                "password": "string"
            })
            .end((err, res) => {
                res.should.have.status(401)
                done()
            });

    });

    it('should throw an error when email exists but password is invalid', (done) => {
        //
        // Hier schrijf je jouw testcase.
        //
        chai.request(server)
            .post('/api/login')
            .send({
                "email": "bartpklomp@gmail.com",
                "password": "thegsadffff"
            })
            .end((err, res) => {
                res.should.have.status(412)
                done()
            });
    });

    it('should throw an error when using an invalid email', (done) => {
        chai.request(server)
            .post('/api/login')
            .send({
                "email": "asdasd",
                "password": "banaan"
            })
            .end((err, res) => {
                res.should.have.status(412)
                done()
            });
    })
});
