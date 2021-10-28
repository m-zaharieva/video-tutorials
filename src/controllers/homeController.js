const router = require('express').Router();

const homeService = require('./../services/homeService.js');


const home = (req, res) => {
    homeService.getPublicCources()
        .then(courses => {
            res.render('home', {courses});
        })
        .catch(err => {
            // TODO error handler
        })
}



router.get('/', home);



module.exports = router;