const Course = require('./../models/Course.js');


const createOne = (courseData, userId) => {
    if (courseData.isPublic == 'on') {
        courseData.isPublic = true;
    } else {
        courseData.isPublic = false;
    }

    return Course.create({ ...courseData, owner: userId });
}

const findOne = (courseId) => {
    return Course.findById(courseId).lean();
}


const editOne = (courseId, updateData) => {
    updateData.isPublic = Boolean(updateData.isPublic);
    return Course.findByIdAndUpdate(courseId, updateData, {runValidators: true});
}

const deleteOne = (courseId) => {
    return Course.findByIdAndDelete(courseId);
}

const enrollOne = (courseId, userId) => {
    return Course.findById(courseId)
        .then(course => {
            if (!course.users.includes(userId)) {
                course.users.push(userId);
                return course.save();
            } else {
                throw new Error ('You are already enrolled to this course!');
            }
        })
}   

let courseService = {
    createOne,
    findOne,
    editOne,
    deleteOne,
    enrollOne,
}


module.exports = courseService;