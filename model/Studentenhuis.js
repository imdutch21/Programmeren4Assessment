const regex = /^[a-zA-Z0-9\s,'-]*$/;
const assert = require("assert");
class Studentenhuis {
    constructor(naam, adres){
        assert(typeof (naam) === 'string', "Naam is geen string");
        assert(typeof (adres) === 'string', "Adres is geen string");
        assert(naam.trim().length > 2, "Naam moet langer zijn dan twee characters");
        assert(adres.trim().length > 2, "Adres moet langer zijn dan twee characters");
        assert(regex.test(adres), "Adres volgt niet de voorwaarden");
        this.naam = naam;
        this.adres = adres;
    }
}
module.exports = Studentenhuis;