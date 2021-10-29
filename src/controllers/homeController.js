const router = require('express').Router();

const homeService = require('./../services/homeService.js');


const home = (req, res) => {
    homeService.getPublicCources()
        .then(courses => {
            res.render('home', {courses});
        })
        .catch(err => {
            let error = [err.message];
            res.render('home', {error})
        })
}



router.get('/', home);



module.exports = router;