const { LOGIN } = require('../dataBase');
const { passwordService, jwtService } = require('../service');
const { userUtil: { userNormalizator } } = require('../utils');

module.exports = {

    loginUser: async (req, res, next) => {
        try {
            const { user } = req;
            const { password, email } = req.body;

            await passwordService.comparePassword(password, user.password);
            const tokenPair = jwtService.generateTokenPair();

            LOGIN.create({ ...tokenPair, user: user._id });

            res.json({
                ...tokenPair,
                user: userNormalizator(req.user)
            });
        } catch (e) {
            next(e);
        }
    }
};
