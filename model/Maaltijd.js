class Maalijd {
    constructor(naam, beschrijving, ingredienten, allergie, prijs) {
        assert(typeof (naam) === 'string', "Naam is geen string");
        assert(typeof (beschrijving) === 'string', "Beschijving is geen string");
        assert(typeof (ingredienten) === 'string', "Ingredienten is geen string");
        assert(typeof (allergie) === 'string', "Allergie is geen string");
        assert(typeof (prijs) === 'number', "Prijs is geen nummer");


        assert(naam.trim().length > 2, "Naam moet langer zijn dan twee characters");
        assert(beschrijving.trim().length > 2, "Beschrijving moet langer zijn dan twee characters");
        assert(ingredienten.trim().length > 2, "Ingredienten moet langer zijn dan twee characters");
        assert(allergie.trim().length > 2, "Allergie moet langer zijn dan twee characters");
        assert(prijs >= 0, "Prijs moet >= aan 0 zijn");
        this.naam = naam;
        this.beschrijving = beschrijving;
        this.ingredienten = ingredienten;
        this.allergie = allergie;
        this.prijs = prijs;
    }
}

module.exports = Studentenhuis;