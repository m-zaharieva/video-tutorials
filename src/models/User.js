const mongoose = require('mongoose');
const bcrypt = require('bcrypt');


const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: [true, 'Username is required.'],
        minlength: [5, 'Username should be at least 5 characters long'],
        validate: [/^[a-zA-Z0-9]+$/i, 'Your username should have only english letters and digits.']
    },
    hashedPassword: {
        type: String,
        required: [true, 'Password is required'],
        minlength: [5, 'Password should be at least 5 characters long'],
        validate: [/^[a-zA-Z0-9]+$/i, 'Your password should have only english letters and digits.']
    },
    courses: [
        {
            type: mongoose.Types.ObjectId,
            ref: 'Course',
        }
    ]
});

userSchema.pre('save', function (next) {
    bcrypt.hash(this.hashedPassword, 10)
        .then(hash => {
            this.hashedPassword = hash;
            next();
        })
})

const User = mongoose.model('User', userSchema);

module.exports = User;