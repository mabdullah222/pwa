const router=require('express').Router()
const user=require('../Models/userModel')
const bcrypt=require('bcrypt')

// sign up 

router.post('/signup',async (req,res)=>{
    let username=req.body.username.trim()
    let name=req.body.name.trim()
    let phone=req.body.phone.trim()
    let password=req.body.password.trim()
    let users=await user.where('username').equals(username);
    const saltRounds = 10;
    const salt = bcrypt.genSaltSync(saltRounds);
    const hashedPass = bcrypt.hashSync(password, salt);
    if (users.length==0){
        let newUser=await user.create({username:username,phone:phone,name:name,language:req.body.language,password:hashedPass});
        res.json({status:200,data:newUser})
    }
    else{
        try{
            res.json({"status":400,"message":"Username exists Already!"})   
        }
        catch(err){
            res.json({status:404,message:"Failed to register the User! Try Again"})
        }
    }
    
})

// login 
router.post('/login',async (req,res)=>{
    try{
        let username=req.body.username.trim()
        let password=req.body.password
        let logged=await user.checkAuth(username)
        if(logged){
            let auth=bcrypt.compareSync(password, logged.password)
            if (auth){
                res.json({"status":200,"data":logged})
            }
            else{
                console.log(auth)
                res.json({"status":400,"message":"Invalid Password"})  
            }
        }
        else{
            res.json({"status":400,"message":"Login failed"}) 
        }
        
        
    }
    catch(err){
        res.json({"status":404,"message":"Error Occured!Try Again"})  
    }
    
})


router.get('/get/:username',async (req,res)=>{
    const username=req.params.username
    let p1=await user.where('username').equals(username)
    res.send(p1[0])
})

router.post('/update',async (req,res)=>{
    try{
        if (req.body.password){
            console.log(req.body.password)
            const saltRounds = 10;
            const salt = await bcrypt.genSaltSync(saltRounds);
            const hashedPass = await bcrypt.hashSync(req.body.password, salt);
            await user.updateOne({username:req.body.username},{$set:{...req.body,password:hashedPass}})
        }
        else{
            await user.updateOne({username:req.body.username},{$set:req.body})
        }
        res.send({status:200})
    }
    catch(err){
        res.send({status:400})
        console.log(err.message)
    }
    
})

module.exports=router