const Joi = require('joi');
const { constants: { EMAIL_REGEXP, PASSWORD_REGEXP } } = require('../config');

const authValidator = Joi.object({
    email: Joi.string().regex(EMAIL_REGEXP).trim().required(),
    password: Joi.string().regex(PASSWORD_REGEXP).trim().required()
});

module.exports = {
    authValidator
};
