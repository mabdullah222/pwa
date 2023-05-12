const router=require('express').Router()
const medicine=require('../Models/medicinesModel')
const disease=require('../Models/diseaseModel')
const fs = require("fs");

router.get('/all',async (req,res)=>{
    let med=await medicine.where();
    res.json(med);
})

router.get('/list',async (req,res)=>{
    let diseases=await disease.where().distinct('crop')
    res.send(diseases);
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