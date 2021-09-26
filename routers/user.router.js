const router = require('express').Router();

const {
    constants: {
        email, body, user_id, params, id
    }
} = require('../config');
const { userController } = require('../controtrolles');
const {
    validatorMiddleware: { validateBody },
    userMiddleware: {
        getUserByDynamicParam, isUserPresent, isUserNotPresent, checkUserForUpdate
    },
    loginMiddleware: { validateToken }
} = require('../middlewares');
const { userValidator: { createUserValidator, updateUser } } = require('../validators');

router.get('/', userController.getAllUsers);

router.get('/:user_id',
    getUserByDynamicParam(user_id, params, id),
    isUserNotPresent,
    userController.getSingleUser);

router.post('/',
    validateBody(createUserValidator),
    getUserByDynamicParam(email, body),
    isUserPresent,
    userController.createUser);

router.put('/:user_id',
    validateBody(updateUser),
    validateToken(),
    getUserByDynamicParam(user_id),
    checkUserForUpdate,
    userController.updateUser);

module.exports = router;
