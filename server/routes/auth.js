const router=require('express').Router();
const User = require("../models/User");
const bcrypt=require("bcrypt");
const jwt=require("jsonwebtoken");



router.post('/register',async(req,res)=>{
    const hashPassword=await bcrypt.hash(req.body.password,10);
    const newUser=new User({...req.body,password:hashPassword});
    try {
        const user=await newUser.save();
        res.status(201).json(user);
    } catch (error) {
        console.log(error);
        res.status(500).send(error);
    }
})


router.post('/login',async(req,res)=>{
    const user= await User.findOne({email: req.body.email});
    if(!user){return res.status(401).json('No user found')}
    let validPassord=await bcrypt.compare(req.body.password,user.password);
    if (!validPassord) { return res.status(401).json('Wrong password')};

    // create token
    const token=jwt.sign({_id:user._id,isAdmin:user.isAdmin},process.env.SECRET ,
        {expiresIn:'1d' });
        
    res.cookie("token",token,{
        httpOnly:true
    })
    const {password,...other}=user._doc;
    res.status(200).json({other,token});
    })


module.exports=router;