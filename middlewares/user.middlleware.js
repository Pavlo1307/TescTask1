const { USER } = require('../dataBase');
const {
    ErrorHandler, statusErrors: { CONFLICT_STATUS },
    messageErrors: { ALREADY_EXIST }
} = require('../errors');

module.exports = {
    getUserByDynamicParam: (paramName, searchIn = 'body', dbId = paramName) => async (req, res, next) => {
        try {
            console.log('1111');
            const value = req[searchIn][paramName];
            console.log('2222');
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
};