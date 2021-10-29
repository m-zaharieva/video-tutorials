const router = require('express').Router();

const courseService = require('./../services/courseService.js');
const courseUserController = require('./../controllers/courseUserController.js');
const authMiddleware = require('./../middlewares/auth.js');

const create = (req, res) => {
    res.render('courses/create');
}

const createCourse = (req, res) => {
    let courseData = req.body;
    courseService.createOne(courseData, req.user._id)
        .then(course => {
            res.redirect('/');
        })
        .catch(err => {
            // TODO Error handler 
        })
}


router.get('/create', authMiddleware.isAuth, create);
router.post('/create', authMiddleware.isAuth, createCourse);

router.use('/:courseId', authMiddleware.userStatus, courseUserController);


module.exports = router;