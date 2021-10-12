const router = require('express').Router();

const { constants: { email } } = require('../config');
const {  } = require('../controllers');
const {
    validatorMiddleware: { validateBody },
    userMiddleware: { getUserDynamicParams, isUserNotPresent }
} = require('../middllewares');
const { loginValidator: { authValidator } } = require('../validators');

router.post('/', validateBody(authValidator),
    getUserDynamicParams(email),
    isUserNotPresent,
    loginUser);

module.exports = router;
