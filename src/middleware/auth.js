const jwt = require("jsonwebtoken");

module.exports = function (req, res, next) {
  // get token from header
  const token = req.header("x-auth-token");

  // check if not token
  if (!token) {
    return res
      .status(401)
      .json({ msg: "no token found, authorization denied" });
  }

  // verify token
  try {
    //   TODO change later
    const decoded = jwt.verify(token, "thisISMySecret");
    req.user = decoded.user;
    next();
  } catch (err) {
    res.status(401).json({ msg: "token is not valid" });
  }
};
