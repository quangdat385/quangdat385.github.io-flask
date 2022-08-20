const mongoose = require('mongoose');
const URI = "mongodb://localhost:27017/tiktok"


const connect = mongoose.connect(URI,{
    useNewUrlParser:true,
    useUnifiedTopology:true,
})


module.exports =connect