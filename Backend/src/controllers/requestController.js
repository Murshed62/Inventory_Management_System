const Request = require('../models/requestModel');
const factory = require('./handlerFactory');
const catchAsync = require('../utils/catchAsync');

exports.getAll = factory.getAll(Request);
exports.create = factory.createOne(Request);
exports.getOne = factory.getOne(Request);
exports.update = factory.updateOne(Request);
exports.delete = factory.deleteOne(Request);

// count total numbers of pending request
exports.countPending = catchAsync(async (req, res, next) => {
  const count = await Request.countDocuments({ status: 'pending' });
  res.status(200).json({
    status: 'success',
    data: count,
  });
});
