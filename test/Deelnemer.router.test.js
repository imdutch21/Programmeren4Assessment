const chai = require('chai')
const chaiHttp = require('chai-http')
const server = require('../server')

chai.should()
chai.use(chaiHttp)

describe('Deelnemer API GET getALL', () => {
    it('should throw an error when deelnemer does not exist', (done) => {
        chai.request(server)
            .get('/api/studentenhuis/7000/maaltijd/54/deelnemers')
            .set('x-access-token', "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJleHAiOjE1MjcxNzYwMjUsImlhdCI6MTUyNjMxMjAyNX0.EQzuGFndkcLuBj7JQ1JNubmSPpmlE-YwTTpCW5rQgDQ")
            .end((err, res) => {
                res.should.have.status(404);
                done()
            })

        it('should return a deelnemer when its called', (done) => {

            chai.request(server)
                .get('/api/studenthuis/1/maaltijd/1/deelnemers')
                .set('x-access-token', "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJleHAiOjE1MjcxNzYwMjUsImlhdCI6MTUyNjMxMjAyNX0.EQzuGFndkcLuBj7JQ1JNubmSPpmlE-YwTTpCW5rQgDQ")
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('object');

                    const response = res.body.result[0];
                    console.dir(response);
                    response.should.have.property('voornaam');
                    response.should.have.property('achternaam');
                    response.should.have.property('email');
                    done()
                })

            it('should throw an error when studenthuisID is missing', (done) => {
                chai.request(server)
                    .get('/api/studenthuis/54/maaltijd/1/deelnemers')
                    .set('x-access-token', "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJleHAiOjE1MjcxNzYwMjUsImlhdCI6MTUyNjMxMjAyNX0.EQzuGFndkcLuBj7JQ1JNubmSPpmlE-YwTTpCW5rQgDQ")
                    .end((err, res) => {
                        res.should.have.status(404)
                    })
                done()
            })

            describe('Deelnemer API DELETE', () => {
                chai.request(server)
                    .delete('/api/studentenhuis/2/maaltijd/2/deelnemers')
                    .set('x-access-token', "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJleHAiOjE1MjcxNzYwMjUsImlhdCI6MTUyNjMxMjAyNX0.EQzuGFndkcLuBj7JQ1JNubmSPpmlE-YwTTpCW5rQgDQ")
                    .end((err, res) => {
                        res.should.have.status(200);

                        done()
                    });
            });

            describe('Deelnemer API POST', () => {
                it('should be successfull when adding a new deelnemer', (done) => {
                    chai.request(server)
                        .post('/api/studentenhuis/2/maaltijd/2/deelnemers')
                        .set('x-access-token', "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJleHAiOjE1MjcxNzYwMjUsImlhdCI6MTUyNjMxMjAyNX0.EQzuGFndkcLuBj7JQ1JNubmSPpmlE-YwTTpCW5rQgDQ")
                        .send({
                            "voornaam": "string",
                            "achternaam": "NEE",
                            "email": "JEZUS",
                        })
                        .end((err, res) => {
                            res.should.have.status(200)
                        })
                    done()
                })

                it('should throw an error when maaltijd is missing', (done) => {
                    chai.request(server)
                        .get('/api/studenthuis/1/maaltijd/5/deelnemers')
                        .set('x-acces-token', "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJleHAiOjE1MjcxNzYwMjUsImlhdCI6MTUyNjMxMjAyNX0.EQzuGFndkcLuBj7JQ1JNubmSPpmlE-YwTTpCW5rQgDQ")
                        .end((err, res) => {
                            res.should.have.status(404)
                        })
                    done()
                })

                it('should return an error when deelnemer is already used', (done) => {
                    chai.request(server)
                        .get('/api/studenthuis/1/maaltijd/1/deelnemer')
                        .set('x-acces-token', "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJleHAiOjE1MjcxNzYwMjUsImlhdCI6MTUyNjMxMjAyNX0.EQzuGFndkcLuBj7JQ1JNubmSPpmlE-YwTTpCW5rQgDQ")
                        .send({
                            "voornaam": "string",
                            "achternaam": "NEE",
                            "email": "JEZUS"
                        })
                        .end((err, res) => {
                            res.should.have.status(409)
                        })

                    done()
                })
            })
        })
    })
})