const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
const assert = require("assert");
const config = require('../config/config.json');
const secret = process.env.SECRETKEY || config.secretkey;

class UserRegister {

    constructor(firstname, lastname, email, password) {
        assert(typeof (firstname) === 'string', "Voornaam is geen string");
        assert(typeof (lastname) === 'string', "Achternaam is geen string");
        assert(typeof (email) === 'string', "Email is geen string it's a " + typeof (email));
        assert(typeof (password) === 'string', "password is geen string");


        assert(firstname.trim().length > 2, "Voornaam moet langer zijn dan twee characters");
        assert(lastname.trim().length > 2, "Achternaam moet langer zijn dan twee characters");
        assert(email.trim().length > 6, "Email moet langer zijn dan zes characters");
        assert(password.trim().length > 2, "Wachtwoord moet langer zijn dan twee characters");

        assert(password.trim().length > 2, "Wachtwoord moet langer zijn dan twee characters");
        assert(email.toLowerCase().match(re), "Email voldoet niet aan de eisen");
        this.firstname = firstname;
        this.lastname = lastname;
        this.email = email;
        this.password = hash(password);
    }
}

class UserLogin {

    constructor(email, password) {
        assert(typeof (email) === 'string', "Email is geen string it's a " + typeof (email));
        assert(typeof (password) === 'string', "password is geen string");

        assert(email.trim().length > 6, "Email moet langer zijn dan zes characters");
        assert(password.trim().length > 2, "Wachtwoord moet langer zijn dan twee characters");

        assert(password.trim().length > 2, "Wachtwoord moet langer zijn dan twee characters");
        assert(re.test(email.toLowerCase()), "Email voldoet niet aan de eisen");
        this.email = email;
        this.password = hash(password);
    }
}

function hash(string) {
    const crypto = require('crypto');

    return crypto.createHmac('sha256', secret)
        .update(string)
        .digest('hex');

}

module.exports = {UserRegister, UserLogin};