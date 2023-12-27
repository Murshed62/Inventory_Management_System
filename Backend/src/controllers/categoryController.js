const Category = require('../models/categoryModel');
const factory = require('./handlerFactory');
const catchAsync = require('../utils/catchAsync');

exports.getAll = catchAsync(async (req, res, next) => {
  const { names } = req.query;
  let categories = [];
  if (names) {
    categories = await Category.find().select('title');
  } else {
    categories = await Category.aggregate([
      {
        $lookup: {
          from: 'products',
          localField: '_id',
          foreignField: 'category',
          as: 'productDetails',
        },
      },

      {
        $sort: { createdAt: -1 },
      },

      {
        $project: {
          _id: 1,
          title: 1,
          totalQty: { $sum: '$productDetails.inStock' },
          numOfProduct: { $size: '$productDetails' },
        },
      },
    ]);
  }
  res.status(200).json({
    status: 'success',
    results: categories.length,
    data: categories,
  });
});
exports.create = factory.createOne(Category);
exports.getOne = factory.getOne(Category);
exports.update = factory.updateOne(Category);
exports.delete = factory.deleteOne(Category);
