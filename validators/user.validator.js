const Joi = require('joi');
const {
    constants: {
        EMAIL_REGEXP,
        PASSWORD_REGEXP,
        PHONE_REGEXP,
        NAME_REGEXP
    },
} = require('../config');

const passwordSchema = Joi.string().regex(PASSWORD_REGEXP).required();

const createUserValidator = Joi.object({
    first_name: Joi.string().min(2).max(30).regex(NAME_REGEXP)
        .required()
        .trim(),
    last_name: Joi.string().regex(NAME_REGEXP).min(2).max(30)
        .required()
        .trim(),
    password: passwordSchema,
    phone: Joi.string().regex(PHONE_REGEXP).required(),
    email: Joi.string().regex(EMAIL_REGEXP).required(),
});

const updateUser = Joi.object({
    first_name: Joi.string().alphanum().min(2).max(30),
    last_name: Joi.string().alphanum().min(2).max(30),
    email: Joi.string().regex(EMAIL_REGEXP),
    phone: Joi.string().regex(PHONE_REGEXP)
});

module.exports = {
    createUserValidator,
    updateUser,
};
