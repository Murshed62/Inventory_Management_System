const moment = require('moment');
const Product = require('../models/productModel');
const Request = require('../models/requestModel');
const catchAsync = require('../utils/catchAsync');

exports.getTotalStats = catchAsync(async (req, res, next) => {
  const { department = 'all' } = req.query;
  const matchPipeline = { status: 'accepted' };
  if (department !== 'all') matchPipeline.department = department;
  const statistics = await Request.aggregate([
    {
      $match: matchPipeline,
    },
    {
      $lookup: {
        from: 'products',
        localField: 'product',
        foreignField: '_id',
        as: 'productDetails',
      },
    },
    {
      $unwind: '$productDetails',
    },
    {
      $group: {
        _id: null,
        totalCost: {
          $sum: {
            $multiply: ['$productDetails.unitPrice', '$quantityProvide'],
          },
        },
        totalProductAssign: { $sum: '$quantityProvide' },
      },
    },
  ]);
  const totalAvailableProducts = await Product.aggregate([
    {
      $group: {
        _id: null,
        totalAvailableProducts: { $sum: '$inStock' },
      },
    },
  ]);

  res.status(200).json({
    status: 'success',
    data: {
      totalProductAssign: statistics[0].totalProductAssign,
      totalCost: statistics[0].totalCost,
      totalAvailableProducts: totalAvailableProducts[0].totalAvailableProducts,
    },
  });
});

exports.getDepartmentProductAssignStats = catchAsync(async (req, res, next) => {
  const { days = 7 } = req.query;
  const startDate = moment().subtract(days, 'days').startOf('day');
  const endDate = moment().endOf('day');
  console.log('start date', startDate.toDate(), 'end date', endDate.toDate());

  const departmentProductStats = await Request.aggregate([
    {
      $match: {
        status: 'accepted',
        updatedAt: {
          $gte: startDate.toDate(),
          $lte: endDate.toDate(),
        },
      },
    },
    {
      $group: {
        _id: '$department',
        totalProductsAssigned: { $sum: '$quantityProvide' },
      },
    },
    {
      $sort: { _id: 1 },
    },
    {
      $project: {
        department: '$_id',
        totalProductsAssigned: '$totalProductsAssigned',
      },
    },
  ]);
  res.status(200).json({
    status: 'success',
    data: departmentProductStats,
  });
});
exports.getDepartmentProductCostStats = catchAsync(async (req, res, next) => {
  const { days = 7 } = req.query;
  const startDate = moment().subtract(days, 'days').startOf('day');
  const endDate = moment().endOf('day');
  console.log('start date', startDate.toDate(), 'end date', endDate.toDate());

  const result = await Request.aggregate([
    {
      $match: {
        status: 'accepted',
        updatedAt: {
          $gte: startDate.toDate(),
          $lte: endDate.toDate(),
        },
      },
    },
    {
      $lookup: {
        from: 'products',
        localField: 'product',
        foreignField: '_id',
        as: 'productDetails',
      },
    },
    {
      $unwind: '$productDetails',
    },
    {
      $group: {
        _id: '$department',
        totalProductsCost: {
          $sum: {
            $multiply: ['$productDetails.unitPrice', '$quantityProvide'],
          },
        },
      },
    },
    {
      $sort: { _id: 1 },
    },
    {
      $project: {
        department: '$_id',
        totalProductsCost: '$totalProductsCost',
      },
    },
  ]);
  res.status(200).json({
    status: 'success',
    data: result,
  });
});
