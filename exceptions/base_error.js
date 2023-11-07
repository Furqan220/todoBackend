// const  HttpStatusCode = require('./exception_enums');

// class BaseError extends Error {
//     constructor(name, httpCode, description, isOperational) {
//       super(description);
//       Object.setPrototypeOf(this, new.target.prototype);
    
//       this.name = name;
//       this.httpCode = httpCode;
//       this.isOperational = isOperational;
    
//       Error.captureStackTrace(this);
//     }
//    }


//    //free to extend the BaseError
//    class APIError extends BaseError {
//     constructor(name, httpCode = HttpStatusCode.INTERNAL_SERVER, isOperational , description ) {
//       super(name, httpCode, isOperational, description);
//     }
//    }

//    class HTTP400Error extends BaseError {
//     constructor(description = 'bad request') {
//       super('NOT FOUND', HttpStatusCode.BAD_REQUEST, true, description);
//     }
//    }

//    module.exports = {
//     APIError,
//     HTTP400Error
//    };