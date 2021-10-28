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

router.get('/create', create);
router.post('/create', createCourse);


module.exports = router;