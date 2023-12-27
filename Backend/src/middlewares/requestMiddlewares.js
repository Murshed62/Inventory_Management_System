exports.loggedInUserRequests = (req, res, next) => {
  req.query.user = req.user._id;
  next();
};
