const { ErrorHandler, statusErrors: { BAD_REQUEST_STATUS } } = require('../errors');

module.exports = {
    validateBody: (validator) => (req, res, next) => {
        try {
            const { error } = validator.validate(req.body);

            if (error) {
                throw new ErrorHandler(BAD_REQUEST_STATUS, error.details[0].message);
            }

            next();
        } catch (e) {
            next(e);
        }
    }
};
