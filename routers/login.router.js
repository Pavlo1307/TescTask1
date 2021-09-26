const router = require('express').Router();

const { loginController: { loginUser } } = require('../controtrolles');
const { constants: { email } } = require('../config');
const {
    validatorMiddleware: { validateBody },
    userMiddleware: { getUserByDynamicParam, isUserNotPresent }
} = require('../middlewares');
const { loginValidator: { authValidator } } = require('../validators');

router.post('/', validateBody(authValidator),
    getUserByDynamicParam(email),
    isUserNotPresent,
    loginUser);

module.exports = router;
