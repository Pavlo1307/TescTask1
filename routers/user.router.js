const router = require('express').Router();

const { constants: { email, body } } = require('../config');
const { userController } = require('../controtrolles');
const {
    validatorMiddleware: { validateBody },
    userMiddleware: { getUserByDynamicParam, isUserPresent }
} = require('../middlewares');

const { userValidator: { createUserValidator } } = require('../validators');

router.post('/',
    validateBody(createUserValidator),
    getUserByDynamicParam(email, body),
    isUserPresent,
    userController.createUser);

module.exports = router;
