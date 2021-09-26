const jwt = require('jsonwebtoken');
const util = require('util');

const verifyPromise = util.promisify(jwt.verify);

const { variables: { ACCESS_SECRET_KEY, REFRESH_SECRET_KEY }, constants: { access } } = require('../config');
const { ErrorHandler, statusErrors: { UNAUTHORIZED_STATUS }, messageErrors: { INVALID_TOKEN } } = require('../errors');

module.exports = {
    generateTokenPair: () => {
        const access_token = jwt.sign({}, ACCESS_SECRET_KEY, { expiresIn: '15m' });
        const refresh_token = jwt.sign({}, REFRESH_SECRET_KEY, { expiresIn: '31d' });

        return {
            access_token,
            refresh_token
        };
    },

    varifyToken: async (token, tokenType = access) => {
        try {
            const secret = tokenType === access ? ACCESS_SECRET_KEY : REFRESH_SECRET_KEY;

            await verifyPromise(token, secret);
        } catch (e) {
            throw new ErrorHandler(UNAUTHORIZED_STATUS, INVALID_TOKEN);
        }
    },
};
