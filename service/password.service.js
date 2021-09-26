const bcrypt = require('bcrypt');

const { ErrorHandler, statusErrors: { BAD_REQUEST_STATUS }, messageErrors: { MAIL_IS_WRONG } } = require('../errors');

module.exports = {
    hash: (password) => bcrypt.hash(password, 10),
    comparePassword: async (password, hash) => {
        const isPasswordMatched = await bcrypt.compare(password, hash);

        if (!isPasswordMatched) {
            throw new ErrorHandler(BAD_REQUEST_STATUS, MAIL_IS_WRONG);
        }
    }
};
