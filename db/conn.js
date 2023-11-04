const mongoose = require('mongoose');
const DB = process.env.DATABASE;

//? connecting mongo atlas
mongoose.connect(DB).then(()=> console.log("connected")).catch((e)=> console.log(e))