const mongoose=require('mongoose')
require('dotenv').config()

function connectdb()
{
    mongoose.connect(process.env.MONGO_URL);
}
module.exports=connectdb