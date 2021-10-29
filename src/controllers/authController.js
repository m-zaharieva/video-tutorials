const router = require('express').Router();

const authService = require('./../services/authService.js');
const { COOKIE_NAME } = require('./../config/constants.js');
const authMiddleware = require('./../middlewares/auth.js');


// Register actions 
const register = (req, res) => {
    res.render('auth/register');
};

const registerUser = (req, res, next) => {
    let userData = req.body;

    if (userData.password !== userData.repeatPassword) {
        let ctx = {
            error: ['Passowrds don\'t match!'],
            username: userData.username,
        }
        res.render('auth/register', ctx);

    }

    authService.register(userData)
        .then(user => {
            if (!user) {
                throw new Error('Unsuccessful registration. Please, try again in a few minutes.')
            }
            return authService.login(user);
        })
        .then(token => {
            res.cookie(COOKIE_NAME, token, {
                httpOnly: true,
            });
            res.redirect('/');
        })
        .catch(err => {
            res.locals.errorHandler = {
                render: 'auth/register',
                redirect: undefined,
                data: userData,
            }
            next(err);
        });
};

// Login actions
const login = (req, res) => {
    res.render('auth/login');
};

const loginUser = (req, res, next) => {
    let userData = req.body;

    authService.login(userData)
        .then(token => {
            res.cookie(COOKIE_NAME, token, {
                httpOnly: true,
            });
            res.redirect('/');
        })
        .catch(err => {
            res.locals.errorHandler = {
                render: 'auth/login',
                redirect: undefined,
                data: userData,
            }
            next(err);
        })

};

const userProfile = (req, res) => {
    let username = req.user.username;

    authService.findUser(username)
        .then(user => {
            user.courses = user.courses.join(', ');
            res.render('auth/profile', user);
        })
}

const logoutUser = (req, res) => {
    res.clearCookie(COOKIE_NAME);
    res.redirect('/');
}

router.get('/register', authMiddleware.isGuest, register);
router.post('/register', authMiddleware.isGuest, registerUser);
router.get('/login', authMiddleware.isGuest, login);
router.post('/login', authMiddleware.isGuest, loginUser);
router.get('/profile', authMiddleware.isAuth, userProfile);
router.get('/logout', logoutUser);

module.exports = router;