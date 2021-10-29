const router = require('express').Router();

const homeService = require('./../services/homeService.js');


const home = (req, res, next) => {
    homeService.getPublicCources()
        .then(courses => {
            res.render('home', { courses });
        })
        .catch(err => {
            res.locals.errorHandler = {
                render: 'home',
                redirect: undefined,
            }
            next(err);
        })
}



router.get('/', home);



module.exports = router;