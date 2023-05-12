const mongoose=require('mongoose')

const userSchema=mongoose.Schema({
    name:String,
    username:String,
    phone:String,
    language:String,
    crops:[String],
    firsttime:{
        type:Boolean,
        default:true
    }
})

userSchema.statics.checkAuth=async function(phone,username)
{
    let newuser=await this.where('phone').equals(phone).where('username').equals(username)

    if (newuser)
    {
        return newuser[0]
    }
    return false
}

module.exports=mongoose.model('user',userSchema)