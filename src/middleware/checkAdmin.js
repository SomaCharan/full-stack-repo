// TODO implement this
module.exports = function (req, res, next) {
  try {
    const admin = await User.findById(req.user.id);

    if (admin.userType !== "0") {
      return res
        .status(401)
        .send({ msg: "You are not authorized to make this action." });
    }

    next();
  } catch (err) {
    res.status(401).json({ msg: "Some error occured while validating authorization. Please try again." });
  }
};
