const router = require('express').Router();




const login = (req, res) => {
    res.render('auth/login');
}

const register = (req, res) => {
    res.render('auth/register');
}




router.get('/login', login)
router.get('/register', register)

module.exports = router;