const router=require("express").Router();
const Product=require("../models/Product");

router.get("/kids",async(req,res)=>{
    try {
        const category=await Product.find({
            categories:{$in:["Kids"]}
        }).limit(1);
        res.status(201).json(category);
    } catch (error) {
        console.log(error);
        res.status(500).json(error);
    }
})
router.get("/mens",async(req,res)=>{
    try {
        const category=await Product.find({
            categories:{$in:["Mens"]}
        }).limit(1);
        res.status(201).json(category);
    } catch (error) {
        console.log(error);
        res.status(500).json(error);
    }
})
router.get("/womens",async(req,res)=>{
    try {
        const category=await Product.find({
            categories:{$in:["Womens"]}
        }).limit(1);
        res.status(201).json(category);
    } catch (error) {
        console.log(error);
        res.status(500).json(error);
    }
})

router.get('/random',async(req,res)=>{
    try {
        const randomProducts=await Product.aggregate([{$sample:{size:10}}])
        res.status(200).json(randomProducts);
    } catch (error) {
        console.log(error);
        res.status(500).json(error);
    }
})


router.get('/:category', async (req, res) => {
    const qCategory = req.params.category
    try {
      const products = await Product.find({
        categories: { $in: [qCategory] },
      }).limit(10);
      res.status(200).json(products);
    } catch (error) {
      res.status(500).json(error);
    }
  });
module.exports=router;