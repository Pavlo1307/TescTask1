const { USER } = require('../dataBase');
const {
    ErrorHandler, statusErrors: { CONFLICT_STATUS, FORBIDDEN_STATUS, NOT_FOUND_STATUS },
    messageErrors: { ALREADY_EXIST, FORBIDDEN, NOT_FOUND_ERR }
} = require('../errors');

module.exports = {
    getUserByDynamicParam: (paramName, searchIn = 'body', dbId = paramName) => async (req, res, next) => {
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
                throw new ErrorHandler(NOT_FOUND_STATUS, NOT_FOUND_ERR);
            }

            next();
        } catch (e) {
            next(e);
        }
    },

    checkUserForUpdate: (req, res, next) => {
        try {
            const { params: { user_id }, loginUser: { _id } } = req;

            if (user_id !== _id.toString()) {
                throw new ErrorHandler(FORBIDDEN_STATUS, FORBIDDEN);
            }

            next();
        } catch (e) {
            next(e);
        }
    }
};
