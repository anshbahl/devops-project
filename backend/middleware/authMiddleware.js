const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
  let token = req.header("Authorization");

  if (!token) {
    return res.status(401).json({ msg: "No token" });
  }

  try {
    // ✅ Safely strip out the Bearer prefix string if present
    if (token.startsWith("Bearer ")) {
      token = token.split(" ")[1];
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    
    // Consistent with your user controller mapping schema
    req.user = { id: decoded.id }; 
    next();
  } catch (err) {
    res.status(401).json({ msg: "Invalid token" });
  }
};