const { USER } = require('../dataBase');
const { passwordService } = require('../service');
const { userUtil: { userNormalizator } } = require('../utils');
const { statusErrors: { CREATED_STATUS, NO_CONTENT_STATUS } } = require('../errors');

module.exports = {
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

    createUser: async (req, res, next) => {
        try {
            const { password } = req.body;
            const hashPassword = await passwordService.hash(password);

            const createdUser = await USER.create({ ...req.body, password: hashPassword });
            const userToReturn = userNormalizator(createdUser);
            res.status(CREATED_STATUS).json(userToReturn);
        } catch (e) {
            next(e);
        }
    },

    deleteUser: async (req, res, next) => {
        try {
            const { user_id } = req.params;
            await USER.deleteOne({ _id: user_id });

            res.sendStatus(NO_CONTENT_STATUS);
        } catch (e) {
            next(e);
        }
    },

    updateUser: async (req, res, next) => {
        try {
            const { user_id } = req.params;

            await USER.findByIdAndUpdate({ _id: user_id }, req.body);

            const upUser = await USER.findOne({ _id: user_id });

            res.status(CREATED_STATUS).json(upUser);
        } catch (e) {
            next(e);
        }
    }
};
