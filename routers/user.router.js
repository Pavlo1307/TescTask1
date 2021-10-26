const router = require('express').Router();

const { userController } = require('../controllers');
const {
    constants: {
        email, user_id, params, id
    }
} = require('../config');
const {
    validatorMiddleware: { validateBody },
    userMiddleware: { getUserDynamicParams, isUserPresent, isUserNotPresent },
    loginMiddleware: { validateToken }
} = require('../middllewares');
const { userValidator: { createUserValidator } } = require('../validators');

router.get('/', userController.getAllUsers);

router.post('/',
    validateBody(createUserValidator),
    getUserDynamicParams(email),
    isUserPresent, userController.createUser);

router.delete('/:user_id',
    validateToken(),
    getUserDynamicParams(user_id, params, id),
    isUserNotPresent,
    userController.deleteUser);

module.exports = router;
