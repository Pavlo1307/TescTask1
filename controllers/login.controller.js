const { LOGIN } = require('../dataBase');
const { jwtService, passwordService } = require('../service');
const { userUtil: { userNormalizator } } = require('../utils');
const { constants: { AUTHORIZATION } } = require('../config');

module.exports = {
    loginUser: async (req, res, next) => {
        try {
            const { user, body: { password } } = req;
            await passwordService.comparePassword(password, user.password);

            const tokenPair = jwtService.generateTokenPair();

            await LOGIN.create({ ...tokenPair, user: user._id });

            res.json({
                ...tokenPair,
                user: userNormalizator(req.user)
            });
        } catch (e) {
            next(e);
        }
    },

    logoutUser: async (req, res, next) => {
        try {
            const access_token = req.get(AUTHORIZATION);
            await LOGIN.deleteOne({ access_token });
            res.json('logout');
        } catch (e) {
            next(e);
        }
    },

    doRefresh: async (req, res, next) => {
        try {
            const refresh_token = req.get(AUTHORIZATION);
            const user = req.loginUser;

            await LOGIN.deleteOne({ refresh_token });

            const tokenPair = jwtService.generateTokenPair();
            await LOGIN.create({ ...tokenPair, user: user._id });
            res.json({
                ...tokenPair,
                user: userNormalizator(req.loginUser)
            });
        } catch (e) {
            next(e);
        }
    },
};
