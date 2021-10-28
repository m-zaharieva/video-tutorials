const router = require('express').Router();


const create = (req, res) => {
    res.render('courses/create');
}

const createCourse = (req, res) => {
    let courseData = req.body;
}

router.get('/create', create);
router.post('/create', createCourse);


module.exports = router;