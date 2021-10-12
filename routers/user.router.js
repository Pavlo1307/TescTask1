const router = require('express').Router();

const { userController } = require('../controllers');
const { constants: { email } } = require('../config');
const {
    validatorMiddleware: { validateBody },
    userMiddleware: { getUserDynamicParams, isUserPresent }
} = require('../middllewares');
const { userValidator: { createUserValidator } } = require('../validators');

router.get('/', userController.getAllUsers);

router.post('/',
    validateBody(createUserValidator),
    getUserDynamicParams(email),
    isUserPresent, userController.createUser);

module.exports = router;
