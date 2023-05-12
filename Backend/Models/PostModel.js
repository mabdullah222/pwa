const mongoose=require('mongoose')



const PostSchema=mongoose.Schema({
    user:String,
    desc:String,
    created_at:{
        type:Date,
        default:Date.now,
    },
    time:String,
    image:[String],
    crop:{
        type:String
    },
    Likes:{type:Number,default:0},
    answer:{
        type:[],
        default:[]
    },  
})



  

module.exports=mongoose.model('Post',PostSchema);