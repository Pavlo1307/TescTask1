const { LOGIN } = require('../dataBase');
const { jwtService: { verifyToken } } = require('../service');
const { constants: { access, AUTHORIZATION } } = require('../config');
const { ErrorHandler, statusErrors: { UN_AUTHORIZED_STATUS }, messageErrors: { NO_TOKEN, INVALID_TOKEN } } = require('../errors');

module.exports = {
    validateToken: (typeToken = access) => async (req, res, next) => {
        try {
            const token = req.get(AUTHORIZATION);

            if (!token) {
                throw new ErrorHandler(UN_AUTHORIZED_STATUS, NO_TOKEN);
            }

            await verifyToken(token, typeToken);

            const tokenFromDB = await LOGIN.findOne({ [typeToken]: token }).populate('user');

            if (!tokenFromDB) {
                throw new ErrorHandler(UN_AUTHORIZED_STATUS, INVALID_TOKEN);
            }

            req.loginUser = tokenFromDB.user;
            next();
        } catch (e) {
            next(e);
        }
    }
};
