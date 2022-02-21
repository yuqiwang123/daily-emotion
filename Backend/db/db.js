const mongoose = require('mongoose');

mongoose.Promise = global.Promise;

const url = "your mongodb url"
// Connect MongoDB at default port 27017.
let mong = mongoose.connect(url, {
    useNewUrlParser: true,
    useCreateIndex: true,
}, (err) => {
    if (!err) {
        console.log('MongoDB Connection Succeeded.')
    } else {
        console.log('Error in DB connection: ' + err)
    }
});
