const router = require('express').Router();

const { constants: { email, refresh } } = require('../config');
const { loginMiddleware: { validateToken } } = require('../middllewares');
const {
    validatorMiddleware: { validateBody },
    userMiddleware: { getUserDynamicParams, isUserNotPresent }
} = require('../middllewares');
const { loginValidator: { authValidator } } = require('../validators');
const { loginController: { loginUser, logoutUser, doRefresh } } = require('../controllers');

router.post('/', validateBody(authValidator),
    getUserDynamicParams(email),
    isUserNotPresent,
    loginUser);

router.post('/logout', validateToken(),
    logoutUser);

router.post('/refresh', validateToken(refresh),
    doRefresh);

module.exports = router;
