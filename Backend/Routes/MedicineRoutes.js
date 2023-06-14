const router=require('express').Router()
const medicine=require('../Models/medicinesModel')
const disease=require('../Models/diseaseModel')
const fs = require("fs");


async function insertData(){
    let med=await medicine.count()
if (med==0){
    await fs.readFile("./medicine.json", "utf8",(err, jsonString) => {
        if (err) {
        console.log("File read failed:", err);
        }
        try {
            const customer = JSON.parse(jsonString);
            medicine.insertMany(customer)
        } catch (err) {
            console.log("Error parsing JSON string:", err.message);
        }
    });
}

let pests=await disease.count()
if (pests==0){
    fs.readFile("./cleanedData.json", "utf8", (err, jsonString) => {
        if (err) {
        console.log("File read failed:", err);
        }
        try {
            const customer = JSON.parse(jsonString);
            disease.insertMany(customer)
        } catch (err) {
            console.log("Error parsing JSON string:", err.message);
        }
    });
}

}

insertData()



router.get('/all',async (req,res)=>{
    let med=await medicine.where();
    res.json(med);
})

router.get('/list',async (req,res)=>{
    let crops=await disease.where().distinct('crop')
    res.send(crops);
})

router.get('/searchformedicines/:crop/:category?',async (req,res)=>
{
    // 
    const allowable=['SeedCare','Insecticide','Fungicide','Herbicide']
    let {crop,category}=req.params
    let medicines=[]
    if (crop!="" && category!="" && allowable.includes(category)){
        medicines=await medicine.where('crop').equals([crop]).where('category').equals(category)
    }
    else{
        medicines=await medicine.where('crop').equals([crop])
    }
    res.send(medicines)
})


router.get('/searchfordiseases/:crop',async (req,res)=>{
    let diseases=await disease.where('crop').equals(req.params.crop)
    res.send(diseases);
})




module.exports=router;