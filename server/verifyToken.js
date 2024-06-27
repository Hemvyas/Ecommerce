const jwt = require("jsonwebtoken");

const verifyToken = async (req, res, next) => {
  const token = req.cookies.token;

  if (!token) {
    return res.status(401).send({ auth: false, message: "No token provided" });
  }

  try {
    const verified = jwt.verify(token, process.env.SECRET);
    req.user = verified;
    next();
  } catch (error) {
    console.error("Token verification error:", error);
    res.status(400).json({ message: "Invalid token" });
  }
};

module.exports = { verifyToken };
