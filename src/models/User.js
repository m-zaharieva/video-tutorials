const mongoose = require('mongoose');
const bcrypt = require('bcrypt');


const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        minlength: [5, 'Username should be at least 5 characters long'],
        validate: [/^[a-zA-Z0-9]+$/i, 'Your username should have only english letters and digits.']
    },
    hashedPassword: {
        type: String,
        required: true,
    },
    courses: [
        {
            type: mongoose.Types.ObjectId,
            ref: 'Course',
        }
    ]
});

userSchema.pre('save', function (next) {
    bcrypt.hash(password, 10)
        .then(hash => {
            this.password = hash;
        })
})

const User = mongoose.model('User', userSchema);

module.exports = User;