const express = require('express');

const { PORT, DB_CONNECTION_STRING } = require('./config/constants.js');
const { handlebars } = require('./config/handlebars.js');
const { database } = require('./config/database.js');
const router = require('./routes.js');

const app = express();
handlebars(app);
app.use(router);

app.get('/', (req, res) => {
    res.render('home');
})

database(DB_CONNECTION_STRING)
    .then(() => {
        app.listen(PORT, () => {
            console.log('Application is running on http://localhost:3000 ...');
        });
    })
    .catch(err => {
        console.log('Unable to connect to database!');
        // TODO Error handling
    })