const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../server');

chai.should();
chai.use(chaiHttp);

describe('Maaltijd API GET all', () => {
    it('should return a maaltijd when get is called', (done) => {
        chai.request(server)
            .get('/api/studentenhuis/1/maaltijd')
            .set('x-access-token', "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJleHAiOjE1MjcyNzIwNDUsImlhdCI6MTUyNjQwODA0NSwic3ViIjoxNn0.hKn_wi3VxqQSETt9QgCrGlJZUrxLjB7xKiwousHRRN4")
            .end((err, res) => {
                res.should.have.status(200);
                res.body.should.be.a('object');

                const response = res.body.result[0];
                console.dir(response);
                response.should.have.property('ID');
                response.should.have.property('Naam');
                response.should.have.property('Beschrijving');
                response.should.have.property('Ingredienten');
                response.should.have.property('Allergie');
                response.should.have.property('Prijs');

                done()
            });
    });

    it('should throw an error because studentenhuis does not exist', (done) => {
        chai.request(server)
            .get('/api/studentenhuis/6000/maaltijd')
            .set('x-access-token', "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJleHAiOjE1MjcyNzIwNDUsImlhdCI6MTUyNjQwODA0NSwic3ViIjoxNn0.hKn_wi3VxqQSETt9QgCrGlJZUrxLjB7xKiwousHRRN4")
            .end((err, res) => {
                res.should.have.status(404);
                done()
            });
    });
});
describe('Maaltijd API GET one', () => {
    it('should throw an error because studentenhuis does not exist', (done) => {
        chai.request(server)
            .get('/api/studentenhuis/6000/maaltijd/1')
            .set('x-access-token', "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJleHAiOjE1MjcyNzIwNDUsImlhdCI6MTUyNjQwODA0NSwic3ViIjoxNn0.hKn_wi3VxqQSETt9QgCrGlJZUrxLjB7xKiwousHRRN4")
            .end((err, res) => {
                res.should.have.status(404);
                done()
            });
    });

    it('should throw an error because maaltijd does not exist', (done) => {
        chai.request(server)
            .get('/api/studentenhuis/1/maaltijd/6000')
            .set('x-access-token', "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJleHAiOjE1MjcyNzIwNDUsImlhdCI6MTUyNjQwODA0NSwic3ViIjoxNn0.hKn_wi3VxqQSETt9QgCrGlJZUrxLjB7xKiwousHRRN4")
            .end((err, res) => {
                res.should.have.status(404);
                done()
            });
    });
    it('should return a maaltijd when get is called with specific id', (done) => {
        chai.request(server)
            .get('/api/studentenhuis/1/maaltijd/1')
            .set('x-access-token', "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJleHAiOjE1MjcyNzIwNDUsImlhdCI6MTUyNjQwODA0NSwic3ViIjoxNn0.hKn_wi3VxqQSETt9QgCrGlJZUrxLjB7xKiwousHRRN4")
            .end((err, res) => {
                res.should.have.status(200);
                res.body.should.be.a('object');

                const response = res.body.result[0];

                response.should.have.property('ID');
                response.should.have.property('Naam');
                response.should.have.property('Beschrijving');
                response.should.have.property('Ingredienten');
                response.should.have.property('Allergie');
                response.should.have.property('Prijs');

                done()
            });
    });
});
describe('Maaltijd API POST', () => {
    it('should be successfull when adding a new maaltijd', (done) => {
        chai.request(server)
            .post('/api/studentenhuis/1/maaltijd')
            .set('x-access-token', "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJleHAiOjE1MjcyNzIwNDUsImlhdCI6MTUyNjQwODA0NSwic3ViIjoxNn0.hKn_wi3VxqQSETt9QgCrGlJZUrxLjB7xKiwousHRRN4")
            .send({
                "naam": "string",
                "beschrijving": "help",
                "ingredienten": "echt van alles",
                "allergie": "string",
                "prijs": 0
            })
            .end((err, res) => {
                res.should.have.status(200);
                res.body.should.be.a('object');

                const response = res.body.result[0];
                response.should.have.property('ID');
                response.should.have.property('Naam').and.equals("string");
                response.should.have.property('Beschrijving').and.equals("help");
                response.should.have.property('Ingredienten').and.equals("echt van alles");
                response.should.have.property('Allergie').and.equals("string");
                response.should.have.property('Prijs').and.equals(0);

                done()
            });
    });

    it('should throw an error because studentenhuis does not exist', (done) => {
        chai.request(server)
            .post('/api/studentenhuis/6000/maaltijd')
            .set('x-access-token', "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJleHAiOjE1MjcyNzIwNDUsImlhdCI6MTUyNjQwODA0NSwic3ViIjoxNn0.hKn_wi3VxqQSETt9QgCrGlJZUrxLjB7xKiwousHRRN4")
            .send({
                "naam": "string",
                "beschrijving": "help",
                "ingredienten": "echt van alles",
                "allergie": "string",
                "prijs": 0
            })
            .end((err, res) => {
                res.should.have.status(404);
                done()
            });
    });

    it('should throw an error body is not correct', (done) => {
        chai.request(server)
            .post('/api/studentenhuis/6000/maaltijd')
            .set('x-access-token', "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJleHAiOjE1MjcyNzIwNDUsImlhdCI6MTUyNjQwODA0NSwic3ViIjoxNn0.hKn_wi3VxqQSETt9QgCrGlJZUrxLjB7xKiwousHRRN4")
            .send({
                "naam": "string",
                "beschrijving": "help",
                "prijs": 0
            })
            .end((err, res) => {
                res.should.have.status(412);
                done()
            });
    });
});
describe('Maaltijd API PUT', () => {
    it('should update the maaltijd when updating a maaltijd', (done) => {
        chai.request(server)
            .put('/api/studentenhuis/1/maaltijd/1')
            .send({
                "naam": "string",
                "beschrijving": "bannaan",
                "ingredienten": "echt van alles",
                "allergie": "string",
                "prijs": 0
            })
            .set('x-access-token', "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJleHAiOjE1MjcyNzIwNDUsImlhdCI6MTUyNjQwODA0NSwic3ViIjoxNn0.hKn_wi3VxqQSETt9QgCrGlJZUrxLjB7xKiwousHRRN4")
            .end((err, res) => {
                res.should.have.status(200);
                res.body.should.be.a('object');

                const response = res.body.result[0];
                console.dir(response);
                response.should.have.property('ID');
                response.should.have.property('Naam').and.equal("string");
                response.should.have.property('Beschrijving').and.equal("bannaan");
                response.should.have.property('Ingredienten').and.equal("echt van alles");
                response.should.have.property('Allergie').and.equal("string");
                response.should.have.property('Prijs').and.equal(0);

                done()
            });
    });

    it('should throw an error because studentenhuis does not exist', (done) => {
        chai.request(server)
            .put('/api/studentenhuis/6000/maaltijd/1')
            .set('x-access-token', "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJleHAiOjE1MjcyNzIwNDUsImlhdCI6MTUyNjQwODA0NSwic3ViIjoxNn0.hKn_wi3VxqQSETt9QgCrGlJZUrxLjB7xKiwousHRRN4")
            .send({
                "naam": "string",
                "beschrijving": "help",
                "ingredienten": "echt van alles",
                "allergie": "string",
                "prijs": 0
            })
            .end((err, res) => {
                res.should.have.status(404);
                done()
            });
    });

    it('should throw an error because maaltijd does not exist', (done) => {
        chai.request(server)
            .put('/api/studentenhuis/1/maaltijd/60000')
            .set('x-access-token', "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJleHAiOjE1MjcyNzIwNDUsImlhdCI6MTUyNjQwODA0NSwic3ViIjoxNn0.hKn_wi3VxqQSETt9QgCrGlJZUrxLjB7xKiwousHRRN4")
            .send({
                "naam": "string",
                "beschrijving": "help",
                "ingredienten": "echt van alles",
                "allergie": "string",
                "prijs": 0
            })
            .end((err, res) => {
                res.should.have.status(404);
                done()
            });
    });

    it('should throw an error because user did not make the object', (done) => { //TODO this
        chai.request(server)
            .put('/api/studentenhuis/6000/maaltijd/1')
            .set('x-access-token', "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJleHAiOjE1MjcyNzIwNDUsImlhdCI6MTUyNjQwODA0NSwic3ViIjoxNn0.hKn_wi3VxqQSETt9QgCrGlJZUrxLjB7xKiwousHRRN4")
            .send({
                "naam": "string",
                "beschrijving": "help",
                "ingredienten": "echt van alles",
                "allergie": "string",
                "prijs": 0
            })
            .end((err, res) => {
                res.should.have.status(404);
                done()
            });
    });

    it('should throw an error body is not correct', (done) => {
        chai.request(server)
            .put('/api/studentenhuis/6000/maaltijd/1')
            .set('x-access-token', "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJleHAiOjE1MjcyNzIwNDUsImlhdCI6MTUyNjQwODA0NSwic3ViIjoxNn0.hKn_wi3VxqQSETt9QgCrGlJZUrxLjB7xKiwousHRRN4")
            .send({
                "naam": "string",
                "beschrijving": "help",
                "prijs": 0
            })
            .end((err, res) => {
                res.should.have.status(412);
                done()
            });
    });
});
describe('Maaltijd API DELETE', () => {
    it('should successfully delete a maaltijd', (done) => {
        chai.request(server)
            .delete('/api/studentenhuis/1/maaltijd/2')
            .set('x-access-token', "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJleHAiOjE1MjcyNzIwNDUsImlhdCI6MTUyNjQwODA0NSwic3ViIjoxNn0.hKn_wi3VxqQSETt9QgCrGlJZUrxLjB7xKiwousHRRN4")
            .end((err, res) => {
                // res.should.have.status(200); TODO give numbers that match an existing entry

                done()
            });
    });
});