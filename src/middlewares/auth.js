const jwt = require('jsonwebtoken');

const { COOKIE_NAME, TOKEN_SECRET } = require('./../config/constants.js');
const courseService = require('./../services/courseService.js');

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

const userStatus = (req, res, next) => {
    let userId = req.user; // ?._id
    console.log(userId);
    let courseId = req.params.courseId;
    return courseService.findOne(courseId).lean()
        .then(course => {

            let isOwner = course.owner == userId;
            let isEnrolled = course.users.find(x => x == userId);

            req.storage = {
                course, 
                userId,
                isOwner,
                isEnrolled,
            };

            return next();
        })
        .catch(err => {
            // TODO Error Handler
        });
}

const isAuth = (req, res, next) => {
    if (!req.user) {
        // TODO Send the user message for his aithorization
        return res.redirect('/auth/login');
    }
    
    next();
}

const isGuest = (req, res, next) => {
    if (req.user) {
        return res.redirect('/');
    }
    next();
}

let authMiddleware = {
    auth,
    userStatus,
    isAuth,
    isGuest,
}

module.exports = authMiddleware;