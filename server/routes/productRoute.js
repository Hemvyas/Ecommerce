const router=require("express").Router();
const {verifyToken}=require("../verifyToken");
const Product=require("../models/Product");

//create product
router.post('/',verifyToken,async(req,res)=>{
    const newProduct=new Product(req.body);
    try {
        if(req.user.isAdmin)
        {
            const savedProduct= await newProduct.save();
            res.status(201).json(savedProduct);
        }
    } catch (error) {
        res.status(500).json(error);
    }
})

//update product
router.put('/:id',verifyToken,async(req,res)=>{
    const userId=req.params.id;
    try {
        if(req.user._id === userId || req.user.isAdmin)
        {
            const updatedProduct=await Product.findByIdAndUpdate(userId,
                {
                    $set:req.body
                },{new:true});
                res.status(201).json(updatedProduct);
        }
    } catch (error) {
        res.status(500).json(error);
    }
})

//delete product
router.delete('/:id',verifyToken,async(req,res)=>{
    const userId=req.params.id;
    try {
        if(req.user.isAdmin)
        {
            await Product.findByIdAndDelete(userId);
            res.status(200).send("Product deleted");
        }
    } catch (error) {
        res.status(500).json(error);
    }
})

//get product
router.get("/:id",async(req,res)=>{
    const userId=req.params.id;
    try {
        const product=await Product.findById(userId);
        res.status(202).json(product);
    } catch (error) {
        res.status(500).json(error);
    }
})

//get all product
router.get('/',async(req,res)=>{
    const qNew=req.query.new;
    const qCategory=req.query.category;
    let product;
    try {
        if(qNew && qNew.toLocaleLowerCase()==="true" )
        {
             product=await Product.find().sort({_id:-1}).limit(2);
        }
        else if(qCategory)
        {
             product=await Product.find({categories:{
                $in:qCategory
            }})
        }
        else{
             product=await Product.find();
        }
        res.status(201).json(product)
    } catch (error) {
        res.status(500).json(error);
    }
})


// router.get('/category/:category', async (req, res) => {
//   const qCategory = req.params.category
//   try {
//     const products = await Product.find({
//       categories: { $in: [qCategory] },
//     }).limit(1);
//     res.status(200).json(products);
//   } catch (error) {
//     res.status(500).json(error);
//   }
// });



  
  

module.exports=router;