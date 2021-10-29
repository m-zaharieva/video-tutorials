const router = require('express').Router();

const authService = require('./../services/authService.js');
const { COOKIE_NAME } = require('./../config/constants.js');
const authMiddleware = require('./../middlewares/auth.js');


// Register actions
const register = (req, res) => {
    res.render('auth/register');
};

const registerUser = (req, res) => {
    let userData = req.body;

    if (userData.password !== userData.repeatPassword) {
        let ctx = {
            error: ['Passowrds don\'t match!'],
            username: userData.username,
        }
        res.render('auth/register', ctx);
        
    } else if (userData.password.length < 5) {
        let ctx = {
            error: ['Your Password should be at least 5 characters long'],
            username: userData.username,
        }
        res.render('auth/register', ctx);

    } else if (!/^[a-zA-Z0-9]+$/.test(userData.password)) {
        let ctx = {
            error: ['Your password should have only English letters and digits'],
            username: userData.username,
        }
        res.render('auth/register', ctx);
    }

    authService.register(userData)
        .then(user => {
            if (!user) {
                throw new Error ('Unsuccessful registration. Please, try again in a few minutes.')
            }
            return user;
        })
        .then(user => {
            return authService.login(user);
        })
        .then(token => {
            res.cookie(COOKIE_NAME, token, { 
                httpOnly: true,
            });
            res.redirect('/');
        })
        .catch(err => {
            let ctx = {
                error: [err.message],
                username: userData.username,
            }

            res.render('auth/register', ctx)
        });
};


// Login actions
const login = (req, res) => {
    res.render('auth/login');
};

const loginUser = (req, res) => {
    let userData = req.body;

    authService.login(userData)
        .then(token => {
            res.cookie(COOKIE_NAME, token, { 
                httpOnly: true,
            });
            res.redirect('/');
        })
        .catch(err => {
            // TODO Error Handler
        })

};

const logoutUser = (req, res) => {
    res.clearCookie(COOKIE_NAME);
    res.redirect('/');
}

router.get('/register', authMiddleware.isGuest, register);
router.post('/register', authMiddleware.isGuest, registerUser);
router.get('/login', authMiddleware.isGuest, login);
router.post('/login', authMiddleware.isGuest, loginUser);
router.get('/logout', logoutUser);

module.exports = router;