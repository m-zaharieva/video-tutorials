const router = require('express').Router();

const courseService = require('./../services/courseService.js');

const create = (req, res) => {
    res.render('courses/create');
}

const createCourse = (req, res) => {
    let courseData = req.body;
    courseService.create(courseData, req.user._id)
        .then(course => {
            res.redirect('/');
        })
        .catch(err => {
            // TODO Error handler 
        })
}

const details = (req, res) => {
    let courseId = req.params.courseId;
    let userId = req.user?._id;
    
    courseService.findOne(courseId)
        .then(course => {
            
            let isOwner = course.owner == userId;
            let isEnrolled = course.users.find(x => x == userId);

            res.render('courses/details', {...course, isOwner, isEnrolled});
        })
        .catch(err => {
            // TODO Error handler
        })
}

router.get('/create', create);
router.post('/create', createCourse);
router.get('/:courseId/details', details);


module.exports = router;