const bcrypt = require('bcrypt');

const User = require('./../models/User.js');
const jwt = require('jsonwebtoken');
const { TOKEN_SECRET } = require('./../config/constants.js');


const register = (userData) => {

    return findUser(userData.username)
        .then(user => {
            if (user) {
                throw new Error('Username is already taken.')
            }

            return hashPassword(userData.password);
        })
        .then(hash => {
            return User.create({ username: userData.username, hashedPassword: hash });
        })
        .catch(err => {
            console.log('register user', err);
            // TODO: Error handler - 'Username is already taken'
        });

}

const login = (userData) => {
    return findUser(userData.username)
        .then(user => {
            if (!user) {
                throw new Error('Incorrect username or password!')
            }
            return createToken(user)
        
        })
        .then(token => {
            return token;
        })
        .catch(er => {
            // TODO: Erro Handler;
        })
}

const findUser = (username) => {
    return User.findOne({ username }).lean();
}

const hashPassword = (password) => {
    return bcrypt.hash(password, 10);
}

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
}

module.exports = authService;