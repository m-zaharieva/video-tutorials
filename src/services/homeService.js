const Course = require('./../models/Course.js');


const getPublicCources = () => {
    return Course.find({isPublic: true}).lean();
}






let homeService = {
    getPublicCources,
}


module.exports = homeService;