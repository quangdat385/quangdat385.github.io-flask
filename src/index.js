const express= require('express');
const path= require('path');
const route = require('./routes');
const connect = require('./config/db');
const morgan = require('morgan')
const cors= require('cors')
const dotenv=require('dotenv')


dotenv.config()

const app = express();
const PORT=process.env.PORT ||5001
console.log(process.env.PORT)
app.use(express.static(path.join(__dirname,'public')))
app.use(morgan('combined'))
app.use(cors())
app.use(express.urlencoded({
    extended:true,
    
}))//handle form
app.use(express.json()); //handle axios



route(app)

connect
    .then(()=>{
        console.log('connect to DB')
        app.listen(PORT,()=>{console.log("successfully",PORT)})
    })
    .catch(err=>{console.log("error:" , err)})

