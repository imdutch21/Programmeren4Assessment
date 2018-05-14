class Error{
    constructor(code, description){
        this.description = description;
        this.status = code;
        this.datetime = Date();
    }
}

module.exports = Error;
