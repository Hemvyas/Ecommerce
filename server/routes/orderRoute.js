const router = require("express").Router();
const { verifyToken } = require("../verifyToken");
const Order = require("../models/Order");

// Create Order

router.post("/", verifyToken, async (req, res) => {
  const { userId, products, totalPrice } = req.body;

  if (req.user._id !== userId && !req.user.isAdmin) {
    return res
      .status(403)
      .json({
        error: "You are not authorized to create an order for this user",
      });
  }

  try {
    const newOrder = new Order({
      userId,
      products,
      totalPrice,
      status: "Pending",
    });

    const savedOrder = await newOrder.save();
    res.status(201).json(savedOrder);
  } catch (error) {
    res.status(500).json({ error: "Failed to create order" });
  }
});

// Get All Orders
router.get("/", verifyToken, async (req, res) => {
  try {
    const orders = await Order.find({ userId: req.user._id }).populate(
      "products.productId"
    );
    res.status(200).json(orders);
  } catch (error) {
    res.status(500).json(error);
  }
});

// Get Order by ID
router.get("/:id", verifyToken, async (req, res) => {
  const orderId = req.params.id;
  try {
    const order = await Order.findById(orderId).populate("products.productId");
    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }
    res.status(200).json(order);
  } catch (error) {
    res.status(500).json(error);
  }
});

module.exports = router;
