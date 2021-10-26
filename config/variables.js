module.exports = {
    PORT: process.env.PORT || 5000,
    DATA_BASE_PORT: process.env.dataBasePost || 'mongodb://localhost:27017/incoraDB',
    ACCESS_SECRET_KEY: process.env.ACCESS_SECRET_KEY || 'SecretWord',
    REFRESH_SECRET_KEY: process.env.REFRESH_SECRET_KEY || 'SecretWord2',
};
