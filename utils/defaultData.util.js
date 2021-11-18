const User = require('../dataBase/User');
const { hash } = require('../service/password.service');

module.exports = (async () => {
    const user = await User.findOne();

    if (!user) {
        const defaultAdmin = {
            username: 'User',
            first_name: 'admin',
            last_name: 'admin',
            email: 'admin@gmail.com',
            role: 'admin',
            password: await hash('Psdsdsd!555')
        };

        await User.create(defaultAdmin);
    }
})();
