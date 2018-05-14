class ApiError {
    constructor(code, message) {
        this.message = message;
        this.code = code;
        this.datetime = Date()

    }
}

module.exports = ApiError;