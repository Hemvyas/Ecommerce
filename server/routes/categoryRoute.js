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


router.get('/cat/:category', async (req, res) => {
    const qCategory = req.params.category;
    const page=parseInt(req.query.page) || 1;
    const limit=parseInt(req.query.limit) || 5;
    try {
        const totalProducts = await Product.countDocuments({
            categories: { $in: [qCategory] },
          });

          const totalPages = Math.ceil(totalProducts / limit);

          const validPage = Math.min(Math.max(page, 1), totalPages);

          const products = await Product.find({
            categories: { $in: [qCategory] },
          })
            .skip((validPage - 1) * limit)
            .limit(limit);

      res.status(200).json({products,totalPages});
    } catch (error) {
      res.status(500).json(error);
    }
  });

// router.get('/get/:category', async (req, res) => {
//     const qCategory = req.params.category;
//     try {
//       const products = await Product.find({
//         categories: { $in: [qCategory] },
//       }).limit(10)
//       res.status(200).json(products);
//     } catch (error) {
//       res.status(500).json(error);
//     }
//   });



module.exports=router;