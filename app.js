const express = require('express');

const { PORT } = require('./config/variables');
const { messageErrors: { NOT_FOUND_ERR }, statusErrors: { NOT_FOUND_STATUS, SERVER_ERROR_STATUS } } = require('./errors');

const app = express();

app.get('/', (req, res) => {
    res.status(404).json('ok');
});
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
