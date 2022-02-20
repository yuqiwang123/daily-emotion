const mongoose = require('mongoose');

mongoose.Promise = global.Promise;

const url = "mongodb+srv://new-user:4Of2lLErulUVBals@cluster0.wgsai.mongodb.net/dailyemotion?retryWrites=true&w=majority"
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
