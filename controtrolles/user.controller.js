const { USER } = require('../dataBase');
const { statusErrors: { CREATED_STATUS } } = require('../errors');
const { passwordService } = require('../service');
const { userUtil: { userNormalizator } } = require('../utils');

module.exports = {
    createUser: async (req, res, next) => {
        try {
            const { password } = req.body;
            const hashedPassword = await passwordService.hash(password);

            const createdUser = await USER.create({ ...req.body, password: hashedPassword });

            const userToReturn = userNormalizator(createdUser);

            res.status(CREATED_STATUS).json(userToReturn);
        } catch (e) {
            next(e);
        }
    },

    getAllUsers: async (req, res, next) => {
        try {
            const allUser = await USER.find({});
            const allUserToReturn = allUser.map((value) => userNormalizator(value));
            res.json(allUserToReturn);
        } catch (e) {
            next(e);
        }
    },

    getSingleUser: (req, res, next) => {
        try {
            const userToReturn = userNormalizator(req.user);

            res.json(userToReturn);
        } catch (e) {
            next(e);
        }
    },

    updateUser: async (req, res, next) => {
        try {
            const { user_id } = req.params;

             await USER.findByIdAndUpdate({ _id: user_id }, req.body);

            res.status(CREATED_STATUS).json('ok');
        } catch (e) {
            next(e);
        }
    }
};
