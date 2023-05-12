const router=require('express').Router()
const post=require('../Models/PostModel')
const multer = require("multer");
const path = require("path");



// media files storeage
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, "../public/uploads/");
    },
    filename: function (req, file, cb) {
      cb(null, Date.now() + path.extname(file.originalname));
    },
  });
  
const upload = multer({ storage: storage });


// creating the post route
router.post('/createPost', upload.array("files"),async (req,res)=>{
    try
    {
        const files = req.files.map((file) => ({
            name: file.originalname,
            path: file.path.split('\\')[3],
          }));
        let image=files.map((file)=>{return file.path})
        let p1=new post({...req.body,image:image});
        await p1.save();
        res.send({"status":200,"message":"Saved To Database"})
    }
    catch(err)
    {
        res.send({"status":400,"message":"fail to save to database"})
    }
   
})


// fectching all the posts
router.get('/posts',async (req,res)=>{
    let posts=await post.where();
    posts.sort((a,b)=>
    {
        return b.created_at - a.created_at
    })
    res.send(posts)
})


// to answer the questions on posts
router.post('/addAns',async (req,res)=>{
    let id=req.body.id
    let user=req.body.user
    let ans=req.body.ans
    try{
        let p1=await post.where({_id:id})
        p1[0].answer.push({user:user,ans:ans})
        await p1[0].save()
        res.send({"status":200,"message":"Saved Successfully"})
    }
    catch(err){
        console.log(err.message)
        res.send({"status":400,"message":err.message})
    }
})


// route for deleting the post
router.post('/deletePost',async (req,res)=>{
    let id=req.body.id
    try{
        let posts=await post.deleteOne({_id:id})
        res.send({"status":200,"data":"Post Deleted Successfully"});
    }
    catch(err){
        console.log(err.message)
        res.send({'Status':400,"Message":"Error Deleting Post! Try Again"})
    }
})


module.exports=router