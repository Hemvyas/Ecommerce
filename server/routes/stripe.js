const router=require("express").Router();
const stripe=require("stripe")("sk_test_51OOKNlSJrhaILpp9LBMqGahgV1J8vOcsIzOfXW3xJlnPAleirKRVw3ZMuMWKQfPUSuJrFqLmrB5MKmTK0PXhrWxe00Ct8f8gjx");

router.post('/payment',async(req,res)=>{
    stripe.charges.create({
        source:req.body.token,
        amount:req.body.amount,
        currency:"usd",
    },(err,res)=>{
        if(err)
        {
            res.status(200).json(err);
        }
        else{
            res.status(200).json(res);
        }
    })
})

module.exports=router;