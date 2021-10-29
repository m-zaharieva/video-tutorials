const router = require('express').Router();

const courseService = require('./../services/courseService.js');
const authMiddleware = require('./../middlewares/auth.js');

const details = (req, res) => {
    let course = req.storage.course;
    let isOwner = req.storage.isOwner;
    let isEnrolled = req.storage.isEnrolled;

    res.render('courses/details', { ...course, isOwner, isEnrolled });
}

const edit = (req, res) => {
    let course = req.storage.course;
    res.render('courses/edit', {...course});
}

const editCourse = (req, res) => {
    let courseId = req.storage.course._id;
    let updateData = req.body;

    courseService.editOne(courseId, updateData)
    .then(course => {
        course.save();
        res.redirect(`/course/${course._id}/details`);
        })
        .catch(err => {
            // TODO error handling
        })
}

const deleteCourse = (req, res) => {
    let courseId = req.storage.course._id;
    courseService.deleteOne(courseId)
        .then(() => {
            res.redirect('/');
        })
        .catch(err => {
            // TODO Error Handler
        })
}

const enrollCourse = (req, res) => {
    let courseId = req.storage.course._id;
    let userId = req.storage.userId;

    courseService.enrollOne(courseId, userId)
        res.redirect(`/course/${courseId}/details`)

}

router.get('/details', details);
router.get('/edit', authMiddleware.isAuth, edit);
router.post('/edit', authMiddleware.isAuth, editCourse);
router.get('/delete', authMiddleware.isAuth, deleteCourse);
router.get('/enroll', authMiddleware.isAuth, enrollCourse);


module.exports = router;