const mongoose=require('mongoose')

const medSchema=mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    activeIngredient:{
        type:String,
        required:true
    },
    crop:{
        type:String,
        required:true
    },
    pest:{
        type:[String],
        required:true
    },
    dose:{
        type:[String],
        required:true
    },
    regType:{
        type:String,
    },
    category:{
        type:String,
    }
});

module.exports=mongoose.model('medicines',medSchema);