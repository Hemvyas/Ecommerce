const router=require("express").Router();
const {verifyToken}=require("../verifyToken");
const Cart=require("../models/Cart");

//create cart
router.post('/',verifyToken,async(req,res)=>{
    const userId=req.params.id;
    const newCart=new Cart(req.body);
    try {
        if(req.user.isAdmin || req.user._id===userId)
        {
            const savedCart= await newCart.save();
            res.status(201).json(savedCart);
        }
    } catch (error) {
        res.status(500).json(error);
    }
})

//update Cart
router.put('/:id',verifyToken,async(req,res)=>{
    const userId=req.params.id;
    try {
        if(req.user._id === userId || req.user.isAdmin)
        {
            const updatedCart=await Cart.findByIdAndUpdate(userId,
                {
                    $set:req.body
                },{new:true});
                res.status(201).json(updatedCart);
        }
    } catch (error) {
        res.status(500).json(error);
    }
})

//delete Cart
router.delete('/:id',verifyToken,async(req,res)=>{
    const userId=req.params.id;
    try {
        if(req.user.isAdmin)
        {
            await Cart.findByIdAndDelete(userId);
            res.status(200).send("Cart deleted");
        }
    } catch (error) {
        res.status(500).json(error);
    }
})

//get Cart
router.get("/:id",async(req,res)=>{
    const userId=req.params.id;
    try {
        if(req.user._id===userId || req.user.isAdmin)
        {
            const cart=await Cart.findOne(userId);
            res.status(202).json(cart);
        }
    } catch (error) {
        res.status(500).json(error);
    }
})

//get all Cart
router.get('/',verifyToken,async(req,res)=>{
    try {
        if(req.user.isAdmin)
        {
            const carts=await Cart.find()
            res.status(200).json(carts)
        }
    } catch (error) {
        res.status(500).json(error)
    }
})

module.exports=router;