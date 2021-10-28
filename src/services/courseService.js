const Course = require('./../models/Course.js');


const create = (courseData) => {
    if (courseData.isPublic == 'on') {
        courseData.isPublic = true;
    } else {
        courseData.isPublic = false;
    }

    return Course.create({...courseData});
}

let courseService = {
    create
}


module.exports = courseService;