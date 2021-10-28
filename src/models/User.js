const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
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

const User = mongoose.model('User', userSchema);

module.exports = User;