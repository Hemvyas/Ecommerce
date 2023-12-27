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

// router.get('/cat/:category', async (req, res) => {
//     const qCategory = req.params.category;
//     const page = parseInt(req.query.page) || 1;
//     const limit = parseInt(req.query.limit) || 5;

//     let filterQuery = {};
//     if (req.query.filter) {
//         const decodedFilter = decodeURIComponent(req.query.filter);
//         filterQuery = JSON.parse(decodedFilter);
//     }

//     try {
//         const validPage = Math.max(page, 1);

//         const products = await Product.find({
//             categories: { $in: [qCategory] },
//             ...filterQuery 
//         }).sort({ _id: req.query.sort === 'newest' ? -1 : 1 })
//             .skip((validPage - 1) * limit)
//             .limit(limit);

//         const totalProducts = await Product.countDocuments({
//             categories: { $in: [qCategory] },
//             ...filterQuery 
//         });

//         const totalPages = Math.ceil(totalProducts / limit);

//         res.status(200).json({ products, totalPages });
//     } catch (error) {
//         res.status(500).json(error);
//         console.log(error);
//     }
// });

  



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


router.get('/cat/:category', async (req, res) => {
    const qCategory = req.params.category;
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 5;

    let filterQuery = {
        categories: { $in: [qCategory] }
    };

    if (req.query.filter) {
        const decodedFilter = decodeURIComponent(req.query.filter);
        const { color, size, type } = JSON.parse(decodedFilter);

        // Check if either color or type is present
        if (color || type) {
            // Use $or operator to match either color or type
            filterQuery.$or = [];

            if (color) {
                filterQuery.$or.push({ color });
            }

            if (type) {
                filterQuery.$or.push({ type });
            }
        }

        // Include size in the filter if present
        if (size) {
            filterQuery.size = size;
        }
    }

    console.log('Filter Query:', filterQuery);

    try {
        const validPage = Math.max(page, 1);

        const products = await Product.find(filterQuery)
            .sort({ _id: req.query.sort === 'newest' ? -1 : 1 })
            .skip((validPage - 1) * limit)
            .limit(limit);

        const totalProducts = await Product.countDocuments(filterQuery);

        const totalPages = Math.ceil(totalProducts / limit);

        res.status(200).json({ products, totalPages });
    } catch (error) {
        res.status(500).json(error);
        console.log(error);
    }
});


module.exports=router;