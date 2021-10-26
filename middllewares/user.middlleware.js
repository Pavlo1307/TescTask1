const { USER } = require('../dataBase');
const { statusErrors: { CONFLICT_STATUS }, messageErrors: { ALREADY_EXIST, NOT_FOUND_ERR }, ErrorHandler } = require('../errors');

module.exports = {
    getUserDynamicParams: (paramName, searchIn = 'body', dbId = paramName) => async (req, res, next) => {
        try {
            const value = req[searchIn][paramName];
            const user = await USER.findOne({ [dbId]: value });

            req.user = user;
            next();
        } catch (e) {
            next(e);
        }
    },

    isUserPresent: (req, res, next) => {
        try {
            const { user } = req;
            if (user) {
                throw new ErrorHandler(CONFLICT_STATUS, ALREADY_EXIST);
            }
            next();
        } catch (e) {
            next(e);
        }
    },

    isUserNotPresent: (req, res, next) => {
        try {
            const { user } = req;
            if (!user) {
                throw new ErrorHandler(CONFLICT_STATUS, NOT_FOUND_ERR);
            }
            next();
        } catch (e) {
            next(e);
        }
    }
};
