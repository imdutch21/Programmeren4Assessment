class Error{
    constructor(code, description){
        this.description = description;
        this.code = code;
        this.datetime = Date()
    }
}

module.exports = Error;
