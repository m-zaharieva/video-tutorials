const express = require('express');
const cookieParser = require('cookie-parser');
const path = require('path');

const { PORT, DB_CONNECTION_STRING } = require('./config/constants.js');
const { handlebars } = require('./config/handlebars.js');
const { database } = require('./config/database.js');
const authMiddleware = require('./middlewares/auth.js');
const router = require('./routes.js');


const app = express();
app.use('/static', express.static(path.resolve(__dirname, './static')));
app.use(express.urlencoded({extended: true}));
app.use(cookieParser());
app.use(authMiddleware.auth);
handlebars(app);
app.use(router);



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