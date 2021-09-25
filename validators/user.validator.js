const Joi = require('joi');
const {
    constants: { EMAIL_REGEXP, PASSWORD_REGEXP },
} = require('../config');

const passwordSchema = Joi.string().regex(PASSWORD_REGEXP).required();

const createUserValidator = Joi.object({
    first_name: Joi.string().alphanum().min(2).max(30)
        .required()
        .trim(),
    last_name: Joi.string().alphanum().min(2).max(30)
        .required()
        .trim(),
    password: passwordSchema,
    email: Joi.string().regex(EMAIL_REGEXP).required(),
});

const updateUser = Joi.object({
    name: Joi.string().alphanum().min(2).max(30),
    email: Joi.string().regex(EMAIL_REGEXP)
});

module.exports = {
    createUserValidator,
    updateUser,
};
