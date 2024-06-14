const router=require("express").Router();
const stripe = require("stripe")(
  "sk_test_51OOKNlSJrhaILpp9LBMqGahgV1J8vOcsIzOfXW3xJlnPAleirKRVw3ZMuMWKQfPUSuJrFqLmrB5MKmTK0PXhrWxe00Ct8f8gjx"
);

router.post("/payment", async (req, res) => {
  try {
    const { tokenId, amount } = req.body;
    const paymentIntent = await stripe.paymentIntents.create({
      amount: amount,
      currency: "usd",
      payment_method_data: {
        type: "card",
        card: {
          token: tokenId,
        },
      },
      confirm: true,
      automatic_payment_methods: {
        enabled: true,
        allow_redirects: "never",
      },
    });

    res.status(200).json(paymentIntent);
  } catch (err) {
    console.error("Error creating payment intent:", err); // Log the error
    res.status(500).json({ error: err.message });
  }
});

module.exports=router;