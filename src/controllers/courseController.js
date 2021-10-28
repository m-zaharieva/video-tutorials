const router = require('express').Router();

const courseService = require('./../services/courseService.js');

const create = (req, res) => {
    res.render('courses/create');
}

const createCourse = (req, res) => {
    let courseData = req.body;
    courseService.create(courseData)
        .then(course => {
            res.redirect('/');
        })
        .catch(err => {
            // TODO Error handler 
        })
}

const details = (req, res) => {
    let courseId = req.params.courseId;
    courseService.findOne(courseId)
        .then(course => {
            res.render('courses/details', {...course});
        })
}

router.get('/create', create);
router.post('/create', createCourse);
router.get('/:courseId/details', details);


module.exports = router;