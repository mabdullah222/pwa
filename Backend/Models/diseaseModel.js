const mongoose=require('mongoose')

const diseaseModel=mongoose.Schema({
    crop:String,
    name:String,
    desc:String,
    images:[String],
})

module.exports=mongoose.model('disease',diseaseModel);