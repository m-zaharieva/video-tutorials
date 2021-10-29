const mongoose = require('mongoose');

const courseSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, 'Title is required'],
        minlength: [5, 'The title should be at least 5 characters long.'],
    },
    description: {
        type: String,
        required: [true, 'Description is required'],
        minlength: [20, 'Description should be at least 20 characters long.'],
    },
    imageUrl: {
        type: String,
        required: [true, 'Image is required'],
        validate: [/^https?:\/\//i, 'Image url should start with http:// or https:// protocol']
    },
    isPublic: {
        type: Boolean,
        default: false,
    },
    createdAt: {
        type: String,
        required: true,
        default: (new Date()).toDateString(),
    },
    users: [
        {
            type: mongoose.Types.ObjectId,
            ref: 'User',
        }
    ],
    owner: {
        type: mongoose.Types.ObjectId,
        ref: 'User',
    }
});


const Course = mongoose.model('Course', courseSchema);

module.exports = Course;