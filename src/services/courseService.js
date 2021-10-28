const Course = require('./../models/Course.js');


const create = (courseData) => {
    if (courseData.isPublic == 'on') {
        courseData.isPublic = true;
    } else {
        courseData.isPublic = false;
    }

    return Course.create({...courseData});
}

const findOne = (courseId) => {
    return Course.findById(courseId).lean();
}





let courseService = {
    create,
    findOne,
}


module.exports = courseService;