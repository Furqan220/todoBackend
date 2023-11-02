const mongoose = require('mongoose');

const connectUtl = 'mongodb+srv://furqan:aIvxFETQJWmSRTOE@cluster0.eql3uj7.mongodb.net/?retryWrites=true&w=majority';

const connection = mongoose.createConnection(connectUtl).on('open', ()=>{
    console.log("Mongo DB connected");
}).on('error',()=>{
    console.log("Mongo DB connection error");
});

module.exports = connection; 