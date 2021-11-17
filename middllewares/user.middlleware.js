const { USER } = require('../dataBase');
const {
    statusErrors: { CONFLICT_STATUS, FORBIDDEN_STATUS },
    messageErrors: { ALREADY_EXIST, NOT_FOUND_ERR, ID_IS_FALSE },
    ErrorHandler
} = require('../errors');

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
    },

    CheckUserForUpdate: (req, res, next) => {
        try {
            const { params: { user_id }, loginUser: { _id } } = req;
            if (user_id !== _id.toString()) {
                throw new ErrorHandler(FORBIDDEN_STATUS, ID_IS_FALSE);
            }

            next();
        } catch (e) {
            next(e);
        }
    }
};
