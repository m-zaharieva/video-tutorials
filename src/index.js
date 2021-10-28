const express = require('express');

const { PORT } = require('./config/constants.js');
const { handlebars } = require('./config/handlebars.js');

const app = express();
handlebars(app);


app.get('/', (req, res) => {
    res.send('Hello world!');
})


app.listen(PORT, () => {
    console.log('Application is running on http://localhost:3000 ...');
})