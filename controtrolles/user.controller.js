const { USER } = require('../dataBase');
const { statusErrors: { CREATED_STATUS } } = require('../errors');
const { passwordService } = require('../service');
const { userUtil: { userNormalizator } } = require('../utils');

module.exports = {
    createUser: async (req, res, next) => {
        try {
            console.log(req.body);
            const { password } = req.body;
            console.log('222222');
            const hashedPassword = await passwordService.hash(password);

            const createdUser = await USER.create({ ...req.body, password: hashedPassword });

            const userToReturn = userNormalizator(createdUser);

            res.status(CREATED_STATUS).json(userToReturn);
        } catch (e) {
            next(e);
        }
    },
};
