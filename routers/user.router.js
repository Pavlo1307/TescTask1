const router = require('express').Router();

const { userController } = require('../controtrolles');

router.post('/',
    userController.createUser);

module.exports = router;
