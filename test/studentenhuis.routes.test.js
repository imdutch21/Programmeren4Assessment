const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../server');

chai.should();
chai.use(chaiHttp);

let deleteID;

describe('Studentenhuis API POST', () => {
    it('should throw an error when using invalid JWT token', (done) => {
        chai.request(server)
            .post('/api/studentenhuis')
            .set('x-access-token', "eyJAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJleHAiOjE1MjcxNzYwMjUsImlhdCI6MTUyNjMxMjAyNX0.EQzuGFndkcLuBj7JQ1JNubmSPpmlE-YwTTpCW5rQgDQ")
            .send({
                "naam": "string",
                "adres": "help"
            })
            .end((err, res) => {
                done()
            });
    });

    it('should return a studentenhuis when posting a valid object', (done) => {
        chai.request(server)
            .post('/api/studentenhuis')
            .set('x-access-token', "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJleHAiOjE1MjcyNzIwNDUsImlhdCI6MTUyNjQwODA0NSwic3ViIjoxNn0.hKn_wi3VxqQSETt9QgCrGlJZUrxLjB7xKiwousHRRN4")
            .send({
                "naam": "string",
                "adres": "help"
            })
            .end((err, res) => {
                res.should.have.status(200);
                res.body.should.be.a('object');

                const response = res.body.result[0];
                response.should.have.property('id');
                response.should.have.property('naam').and.equals("string");
                response.should.have.property('adres').and.equals("help");
                response.should.have.property('contact');
                response.should.have.property('email');
                deleteID = res.body.result.id;

                done()
            });
    });

    it('should throw an error when naam is missing', (done) => {
        chai.request(server)
            .post('/api/studentenhuis')
            .send({
                "adres": "help"
            })
            .set('x-access-token', "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJleHAiOjE1MjcyNzIwNDUsImlhdCI6MTUyNjQwODA0NSwic3ViIjoxNn0.hKn_wi3VxqQSETt9QgCrGlJZUrxLjB7xKiwousHRRN4")
            .end((err, res) => {
                res.should.have.status(412);

                done()
            });
    });

    it('should throw an error when adres is missing', (done) => {
        chai.request(server)
            .post('/api/studentenhuis')
            .set('x-access-token', "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJleHAiOjE1MjcyNzIwNDUsImlhdCI6MTUyNjQwODA0NSwic3ViIjoxNn0.hKn_wi3VxqQSETt9QgCrGlJZUrxLjB7xKiwousHRRN4")
            .send({
                "naam": "help"
            })
            .end((err, res) => {
                res.should.have.status(412);

                done()
            });
    })
});

describe('Studentenhuis API GET all', () => {
    it('should throw an error when using invalid JWT token', (done) => {
        chai.request(server)
            .get('/api/studentenhuis')
            .set('x-access-token', "eyJAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJleHAiOjE1MjcxNzYwMjUsImlhdCI6MTUyNjMxMjAyNX0.EQzuGFndkcLuBj7JQ1JNubmSPpmlE-YwTTpCW5rQgDQ")
            .end((err, res) => {
                done()
            });
    });

    it('should return all studentenhuizen when using a valid token', (done) => {
        chai.request(server)
            .get('/api/studentenhuis')
            .set('x-access-token', "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJleHAiOjE1MjcyNzIwNDUsImlhdCI6MTUyNjQwODA0NSwic3ViIjoxNn0.hKn_wi3VxqQSETt9QgCrGlJZUrxLjB7xKiwousHRRN4")
            .end((err, res) => {
                res.should.have.status(200);
                res.body.should.be.a('object');
                done()
            });
    })
});

describe('Studentenhuis API GET one', () => {
    it('should throw an error when using invalid JWT token', (done) => {
        chai.request(server)
            .get('/api/studentenhuis/1')
            .set('x-access-token', "eyJAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJleHAiOjE1MjcxNzYwMjUsImlhdCI6MTUyNjMxMjAyNX0.EQzuGFndkcLuBj7JQ1JNubmSPpmlE-YwTTpCW5rQgDQ")
            .end((err, res) => {
                done()
            });
    });

    it('should return the correct studentenhuis when using an existing huisId', (done) => {
        chai.request(server)
            .get('/api/studentenhuis/1')
            .set('x-access-token', "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJleHAiOjE1MjcyNzIwNDUsImlhdCI6MTUyNjQwODA0NSwic3ViIjoxNn0.hKn_wi3VxqQSETt9QgCrGlJZUrxLjB7xKiwousHRRN4")
            .end((err, res) => {
                res.should.have.status(200);
                res.body.should.be.a('object');
                res.body.result[0].should.have.property("id").and.equal(1);
                done()
            });

    });

    it('should return an error when using an non-existing huisId', (done) => {
        chai.request(server)
            .get('/api/studentenhuis/600000')
            .set('x-access-token', "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJleHAiOjE1MjcyNzIwNDUsImlhdCI6MTUyNjQwODA0NSwic3ViIjoxNn0.hKn_wi3VxqQSETt9QgCrGlJZUrxLjB7xKiwousHRRN4")
            .end((err, res) => {
                res.should.have.status(404);
                done()
            });
    })
});

describe('Studentenhuis API PUT', () => {
    it('should throw an error when using invalid JWT token', (done) => {
        chai.request(server)
            .put('/api/studentenhuis')
            .set('x-access-token', "eyJAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJleHAiOjE1MjcxNzYwMjUsImlhdCI6MTUyNjMxMjAyNX0.EQzuGFndkcLuBj7JQ1JNubmSPpmlE-YwTTpCW5rQgDQ")
            .send({
                "naam": "string",
                "adres": "help"
            })
            .end((err, res) => {
                done()
            });
    });

    it('should return a studentenhuis with ID when posting a valid object', (done) => {
        chai.request(server)
            .put('/api/studentenhuis/1')
            .set('x-access-token', "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJleHAiOjE1MjcyNzIwNDUsImlhdCI6MTUyNjQwODA0NSwic3ViIjoxNn0.hKn_wi3VxqQSETt9QgCrGlJZUrxLjB7xKiwousHRRN4")
            .send({
                "naam": "string",
                "adres": "help"
            })
            .end((err, res) => {
                res.should.have.status(200);
                res.body.should.be.a('object');

                const response = res.body.result[0];
                response.should.have.property('id');
                response.should.have.property('naam').and.equals("string");
                response.should.have.property('adres').and.equals("help");
                response.should.have.property('contact');
                response.should.have.property('email');

                done()
            });
    });

    it('should throw an error when naam is missing', (done) => {
        chai.request(server)
            .put('/api/studentenhuis/1')
            .set('x-access-token', "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJleHAiOjE1MjcyNzIwNDUsImlhdCI6MTUyNjQwODA0NSwic3ViIjoxNn0.hKn_wi3VxqQSETt9QgCrGlJZUrxLjB7xKiwousHRRN4")
            .send({
                "adres": "help"
            })
            .end((err, res) => {
                res.should.have.status(412);

                done()
            });
    });

    it('should throw an error when adres is missing', (done) => {
        chai.request(server)
            .put('/api/studentenhuis/1')
            .set('x-access-token', "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJleHAiOjE1MjcyNzIwNDUsImlhdCI6MTUyNjQwODA0NSwic3ViIjoxNn0.hKn_wi3VxqQSETt9QgCrGlJZUrxLjB7xKiwousHRRN4")
            .send({
                "naam": "string"
            })
            .end((err, res) => {
                res.should.have.status(412);

                done()
            });
    })
});

describe('Studentenhuis API DELETE', () => {
    it('should throw an error when using invalid JWT token', (done) => {
        chai.request(server)
            .delete('/api/studentenhuis')
            .set('x-access-token', "eyJAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJleHAiOjE1MjcxNzYwMjUsImlhdCI6MTUyNjMxMjAyNX0.EQzuGFndkcLuBj7JQ1JNubmSPpmlE-YwTTpCW5rQgDQ")
            .send({
                "naam": "string",
                "adres": "help"
            })
            .end((err, res) => {
                done()
            });
    });

    //will not always pass because the id will nog exist the secound time
    it('should succesfully delete an studentenhuis', (done) => {
        chai.request(server)
            .delete('/api/studentenhuis/' + deleteID)
            .set('x-access-token', "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJleHAiOjE1MjcyNzIwNDUsImlhdCI6MTUyNjQwODA0NSwic3ViIjoxNn0.hKn_wi3VxqQSETt9QgCrGlJZUrxLjB7xKiwousHRRN4")
            .end((err, res) => {
                res.should.have.status(200);

                done()
            });
    });

});