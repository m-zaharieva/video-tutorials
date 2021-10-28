const { COOKIE_NAME, TOKEN_SECRET } = require('./../config/constants.js');
const jwt = require('jsonwebtoken');

const auth = (req, res, next) => {
    let token = req.cookies[COOKIE_NAME];
    if (!token) {
        return next();
    }

    jwt.verify(token, TOKEN_SECRET, (err, data) => {
        if (err) {
            res.redirect('/auth/login');
        } else {
            req.user = data;
            res.locals.user = data;
            next();
        }
    });
}


let authMiddleware = {
    auth
}

module.exports = authMiddleware