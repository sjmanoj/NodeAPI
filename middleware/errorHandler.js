const { constants } = require('../constants')
const errorHandler = (err,req,res,next)=>{
    const statusCode = res.statusCode ? res.statusCode : 500
    switch (statusCode) {
        case constants.VALIDATION_ERROR:
            res.json({title: "Validation Error",message: err.message, stackTrace: process.env.NODE_ENV === 'development' ? err.stack : null})
            break;
        case constants.UNAUTHORIZED:
            res.json({title: "Unauthorized",message: err.message, stackTrace: process.env.NODE_ENV === 'development' ? err.stack : null})
            break;
        case constants.FORBIDDEN:
            res.json({title: "Forbidden",message: err.message, stackTrace: process.env.NODE_ENV === 'development' ? err.stack : null})
            break;
        case constants.NOT_FOUND:
            res.json({title: "Not Found",message: err.message, stackTrace: process.env.NODE_ENV === 'development' ? err.stack : null})
            break;  
        case constants.NOT_FOUND:
            res.json({title: "Server Error",message: err.message, stackTrace: process.env.NODE_ENV === 'development' ? err.stack : null})
            break;  
        default:
            res.json({message: 'All Good, NO ERROR!'})
            break;
    }
    
    
}

module.exports = errorHandler