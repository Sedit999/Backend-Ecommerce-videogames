const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
  const token = req.header("x-auth-token");

  if (!token) {
    return res.status(401).json({ message: "Permiso no válido o inexistente" });
  }

  try {
    const verifiedToken = jwt.verify(token, process.env.SECRET);
    req.user = verifiedToken.user;
    next();
  } catch (err) {
    res.json({ message: "Hubo un error", description: err });
  }
};
