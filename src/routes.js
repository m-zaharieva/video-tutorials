const router = require('express').Router();

const authController = require('./controllers/authController.js');
const courseController = require('./controllers/courseController.js');


router.use('/auth', authController);
router.use('/course', courseController);




module.exports = router;
