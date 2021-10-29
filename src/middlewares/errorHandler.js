exports.errorHandler = (err, req, res, next) => {
    if (err) {
        console.log('Error Handler-', res.locals.errorHandler);
        let halper = res.locals.errorHandler;
        let error;

        if (err.errors && Object.keys(err.errors).length) {
            error = Object.keys(err.errors).map(v => err.errors[v].properties.message);
        } else {
            error = [err.message];
        }
        
        let ctx = {
            error: error,
            data: halper.data,
        }

        if (halper.render) {
            res.render(`${halper.render}`, ctx)
        } else {
            res.redirect(`${halper.redirect}`, ctx)
        }
    }
};

// res.locals.errorHandler = {
//     render: 'auth/register',
//     redirect: undefined,
//     data: userData,
// }
// next(err);