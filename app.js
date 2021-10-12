const express = require('express');
const mongoose = require('mongoose');
const { userRouter, loginRouter } = require('./routers');

const { PORT, DATA_BASE_PORT } = require('./config/variables');
const { messageErrors: { NOT_FOUND_ERR }, statusErrors: { NOT_FOUND_STATUS, SERVER_ERROR_STATUS } } = require('./errors');

const app = express();

mongoose.connect(DATA_BASE_PORT, { useNewUrlParser: true, useUnifiedTopology: true });

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
    res.status(404).json('ok');
});

app.use('/users', userRouter);
app.use('/login', loginRouter);

app.use('*', _notFoundError);
app.use(_mainErrorHandler);

app.listen(PORT, () => {
    console.log('App listen', PORT);
});

function _notFoundError(err, req, res, next) {
    next({
        status: err.status || NOT_FOUND_STATUS,
        message: err.message || NOT_FOUND_ERR
    });
}

// eslint-disable-next-line no-unused-vars
function _mainErrorHandler(err, req, res, next) {
    res
        .status(err.status || SERVER_ERROR_STATUS)
        .json({
            message: err.message
        });
}
