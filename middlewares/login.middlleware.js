const { LOGIN } = require('../dataBase');
const { jwtService: { varifyToken } } = require('../service');
const { constants: { AUTHORIZATION, access, user } } = require('../config');
const {
    ErrorHandler, statusErrors: { UNAUTHORIZED_STATUS },
    messageErrors: { NO_TOKEN, INVALID_TOKEN }
} = require('../errors');

module.exports = {
    validateToken: (typeToken = access) => async (req, res, next) => {
        try {
            const token = req.get(AUTHORIZATION);

            if (!token) {
                throw new ErrorHandler(UNAUTHORIZED_STATUS, NO_TOKEN);
            }

            await varifyToken(token, typeToken);
            const tokenFromDB = await LOGIN.findOne({ [typeToken]: token }).populate(user);

            if (!tokenFromDB) {
                throw new ErrorHandler(UNAUTHORIZED_STATUS, INVALID_TOKEN);
            }

            req.loginUser = tokenFromDB.user;

            next();
        } catch (e) {
            next(e);
        }
    }
};
