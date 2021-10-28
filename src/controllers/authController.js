const router = require('express').Router();

const authService = require('./../services/authService.js');
const { COOKIE_NAME } = require('./../config/constants.js');


// Register actions
const register = (req, res) => {
    res.render('auth/register');
};

const registerUser = (req, res) => {
    let userData = req.body;

    if (userData.password !== userData.repeatPassword) {
        let ctx = {
            error: 'Passowrds don\'t match!',
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
            // TODO Error handler;
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


router.get('/register', register);
router.post('/register', registerUser);
router.get('/login', login);
router.post('/login', loginUser);
router.get('/logout', logoutUser)

module.exports = router;