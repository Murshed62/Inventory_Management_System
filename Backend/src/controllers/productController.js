const Product = require('../models/productModel');
const factory = require('./handlerFactory');
const catchAsync = require('../utils/catchAsync');
const ApiFeatures = require('../utils/apiFeatures');

exports.getAll = factory.getAll(Product);

exports.create = factory.createOne(Product);
exports.getOne = factory.getOne(Product);
exports.update = factory.updateOne(Product);
exports.delete = factory.deleteOne(Product);

exports.searchProducts = catchAsync(async (req, res, next) => {
  const { name } = req.query;

  // Build a case-insensitive regular expression for the search
  const regex = new RegExp(name?.split(' ').join('.*'), 'i');
  const filteredQuery = { name: regex };

  // Use the find method to search for products by name
  let query = new ApiFeatures(Product.find(filteredQuery), req.query)
    .sort()
    .limitFields()
    .paginate();
  const products = await query.query;
  // count total documents
  const totalDoc = await Product.countDocuments(filteredQuery);

  res.status(200).json({
    status: 'success',
    results: products.length,
    totalDoc,
    data: products,
  });
});
