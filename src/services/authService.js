const bcrypt = require('bcrypt');

const User = require('./../models/User.js');
const jwt = require('jsonwebtoken');
const { TOKEN_SECRET } = require('./../config/constants.js');


const register = (userData) =>
    findUser(userData.username)
        .then(user => {
            if (user) {
                throw new Error('Username is already taken.')
            }
            return User.create({ username: userData.username, hashedPassword: userData.password });
        });


const login = (userData) => {
    return findUser(userData.username)
        .then(user => {
            if (!user) {
                throw new Error('Incorrect username or password!')
            }

            return Promise.all([bcrypt.compare(userData.password, user.hashedPassword), user]);
        })
        .then(([isValid, user]) => {
            if (!isValid) {
                throw new Error('Incorrect username or password!')
            }
            return createToken(user);
        })
        .then(token => {
            return token;
        });
}

const findUser = (username) => {
    return User.findOne({ username }).populate('courses').lean();
}

// const hashPassword = (password) => {
//     return bcrypt.hash(password, 10);
// }

const createToken = (user) => {
    let payload = {
        _id: user._id,
        username: user.username
    }

    return jwt.sign(payload, TOKEN_SECRET, { expiresIn: '1h' });
}






const authService = {
    register,
    login,
    findUser,
}

module.exports = authService;