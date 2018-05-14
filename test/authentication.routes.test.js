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
        //
        // Hier schrijf je jouw testcase.
        //

        // Tip: deze test levert een token op. Dat token gebruik je in 
        // andere testcases voor beveiligde routes door het hier te exporteren
        // en in andere testcases te importeren via require.
        // validToken = res.body.token
        // module.exports = {
        //     token: validToken
        // }

        chai.request(server)
        .get('/api/register')
        .send({
            "firstname": "string",
            "lastname": "string",
            "email": "string",
            "password": "string"
        })
        .end((err,res) => {
            res.should.have.status(200);
            res.body.should.be.a('object');
            let validToken = res.body.token


            validToken.should.be.a('object')


        });
        done()
    });

    it('should return an error on GET request', (done) => {
        //
        // Hier schrijf je jouw testcase.
        //

        chai.request(server)
        .get('/api/register')
        .end((err,res) =>{
            res.should.have.status(404)

        });
        done()
    });

    it('should throw an error when the user already exists', (done) => {
        //
        // Hier schrijf je jouw testcase.
        //
        chai.request(server)
        .get('/api/register')
        .send({
            "firstname": "string",
            "lastname": "string",
            "email": "string",
            "password": "string"
        })
        .end((err,res) => {
            res.should.have.status(404)

        })
        done()
    });

    it('should throw an error when no firstname is provided', (done) => {
        //
        // Hier schrijf je jouw testcase.
        //
        chai.request(server)
        .get('/api/register')
        .send({
            "lastname": "string",
            "email": "string",
            "password": "string"
        })
        .end((err,res) => {
            res.should.have.status(412)
        });
        done()
    });

    it('should throw an error when firstname is shorter than 2 chars', (done) => {
        //
        // Hier schrijf je jouw testcase.
        //
        chai.request(server)
        .get('/api/register')
        .send({
            "firstname" : "a",
            "lastname": "string",
            "email": "string",
            "password": "string"

        })
        .end((err,res) =>{
            res.should.have.status(412)
        })
        done()
    });

    it('should throw an error when no lastname is provided', (done) => {
        //
        // Hier schrijf je jouw testcase.
        //
        chai.request(server)
        .get('/api/register')
        .send({
            "firstname": "string",
            "email": "string",
            "password": "string"
        })
        .end((err,res) => {
            res.should.have.status(404)
        })
        done()
    });

    it('should throw an error when lastname is shorter than 2 chars', (done) => {
        //
        // Hier schrijf je jouw testcase.
        //
        chai.request(server)
        .get('/api/register')
        .send({
            "firstname": "string",
            "lastname": "a",
            "email": "string",
            "password": "string"
        })
        .end((err,res) => {
            res.should.have.status(412)
        })
        done()
    });

    it('should throw an error when email is invalid', (done) => {
        //
        // Hier schrijf je jouw testcase.
        //
        chai.request(server)
            .get('/api/register')
            .send({
                "firstname": "string",
                "lastname": "a",
                "password": "string"
            })
            .end((err, res) => {
                res.should.have.status(412)
            })
        done()
    })

});

describe('Login', () => {

    it('should return a token when providing valid information', (done) => {
        //
        // Hier schrijf je jouw testcase.
        //
        chai.request(server)
            .get('/api/login')
            .send({
                "email": "string",
                "password": "string"
            })
            .end((err, res) => {
                res.should.have.status(200);
                res.body.should.be.a('object');
                let validToken = res.body.token


                validToken.should.be.a('object')

        done()
    });

    it('should throw an error when email does not exist', (done) => {
        //
        // Hier schrijf je jouw testcase.
        //
        chai.request(server)
        .get('/api/login')
        .send({
            "email" : "ghdfsa",
            "password" : "string"
        })
        .end((err,res) => {
            res.should.have.status(412)
        })
        done()
    });

    it('should throw an error when email exists but password is invalid', (done) => {
        //
        // Hier schrijf je jouw testcase.
        //
        chai.request(server)
        .get('/api/login')
        .send({
            "email" : "string",
            "password" : "thegsadffff"
        })
        .end((err,res) => {
            res.should.have.status(412)
        })
        done()
    });

    it('should throw an error when using an invalid email', (done) => {
        //
        // Hier schrijf je jouw testcase.
        //
        chai.request(server)
        .get('/api/login')
        .send({
            "email" : "string",
            "password" : "string"
        })
        .end((err,res) => {
            res.should.have.status(412)
        })
        done()
    })
})
})
