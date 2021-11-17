const Joi = require('joi');
const { userRoles } = require('../config');
const {
    constants: {
        EMAIL_REGEXP,
        PASSWORD_REGEXP,
        NAME_REGEXP
    },
} = require('../config');

const passwordSchema = Joi.string().regex(PASSWORD_REGEXP).required();

const createUserValidator = Joi.object({
    username: Joi.string().regex(NAME_REGEXP).min(2).max(30)
        .required()
        .trim(),
    first_name: Joi.string().min(2).max(30).regex(NAME_REGEXP)
        .required()
        .trim(),
    last_name: Joi.string().regex(NAME_REGEXP).min(2).max(30)
        .required()
        .trim(),
    password: passwordSchema,
    email: Joi.string().regex(EMAIL_REGEXP).required(),
    role: Joi.string().allow(...Object.values(userRoles)),
});

const updateUser = Joi.object({
    username: Joi.string().alphanum().min(2).max(30),
    first_name: Joi.string().alphanum().min(2).max(30),
    last_name: Joi.string().alphanum().min(2).max(30),
    email: Joi.string().regex(EMAIL_REGEXP)
});

module.exports = {
    createUserValidator,
    updateUser
};
