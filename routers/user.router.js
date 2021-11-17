const router = require('express').Router();

const { userController } = require('../controllers');
const {
    constants: {
        email, user_id, params, id, username
    }
} = require('../config');
const {
    validatorMiddleware: { validateBody },
    userMiddleware: {
        getUserDynamicParams, isUserPresent, isUserNotPresent
    },
} = require('../middllewares');
const { userValidator: { createUserValidator, updateUser } } = require('../validators');

router.get('/', userController.getAllUsers);

router.post('/',
    validateBody(createUserValidator),
    getUserDynamicParams(username),
    isUserPresent, userController.createUser);

router.get('/:user_id',
    getUserDynamicParams(user_id, params, id),
    isUserNotPresent,
    userController.getSingleUser);

router.delete('/:user_id',
    getUserDynamicParams(user_id, params, id),
    isUserNotPresent,
    userController.deleteUser);

router.put('/:user_id',
    validateBody(updateUser),
    getUserDynamicParams(user_id),
    userController.updateUser);

module.exports = router;
