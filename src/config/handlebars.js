const hbs = require('express-handlebars');
const path = require('path');

exports.handlebars = (app) => {
    app.engine('hbs', hbs({
        extname: 'hbs',
    }));
    app.set('view engine', 'hbs');
    app.set('views', path.resolve(__dirname, './src/views'));
}