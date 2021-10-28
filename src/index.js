const express = require('express');

const { PORT } = require('./config/constants.js');

const app = express();


app.get('/', (req, res) => {
    res.send('Hello world!');
})


app.listen(PORT, () => {
    console.log('Application is running on http://localhost:3000 ...');
})