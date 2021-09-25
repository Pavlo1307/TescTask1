const express = require('express');

const { PORT } = require('./config/variables')


const app = express();


app.get('/', (req, res) => {

    res.status(404).json('ok');
});

app.listen(PORT, () => {
    console.log('App listen 5000')
})
