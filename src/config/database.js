const mongoose = require('mongoose');


exports.database = (string) => {
    return mongoose.connect(string, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
}