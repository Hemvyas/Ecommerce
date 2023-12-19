const router=require("express").Router();
const {verifyToken}=require("../verifyToken");
const Order=require("../models/Order");

//create Order
router.post('/',verifyToken,async(req,res)=>{
    const userId=req.params.id;
    const newOrder=new Order(req.body);
    try {
        if(req.user.isAdmin || req.user._id===userId)
        {
            const savedOrder= await newOrder.save();
            res.status(201).json(savedOrder);
        }
    } catch (error) {
        res.status(500).json(error);
    }
})

//update Order
router.put('/:id',verifyToken,async(req,res)=>{
    const userId=req.params.id;
    try {
        if(req.user.isAdmin)
        {
            const updatedOrder=await Order.findByIdAndUpdate(userId,
                {
                    $set:req.body
                },{new:true});
                res.status(201).json(updatedOrder);
        }
    } catch (error) {
        res.status(500).json(error);
    }
})

//delete Order
router.delete('/:id',verifyToken,async(req,res)=>{
    const userId=req.params.id;
    try {
        if(req.user.isAdmin)
        {
            await Order.findByIdAndDelete(userId);
            res.status(200).send("Order deleted");
        }
    } catch (error) {
        res.status(500).json(error);
    }
})

//get Order
router.get("/:id",async(req,res)=>{
    const userId=req.params.id;
    try {
        if(req.user._id===userId || req.user.isAdmin)
        {
            const order=await Order.find(userId);
            res.status(202).json(order);
        }
    } catch (error) {
        res.status(500).json(error);
    }
})

//get all Order
router.get('/',verifyToken,async(req,res)=>{
    try {
        if(req.user.isAdmin)
        {
            const orders=await Order.find()
            res.status(200).json(orders)
        }
    } catch (error) {
        res.status(500).json(error)
    }
})

//monthly income


module.exports=router;