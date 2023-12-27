const mongoose = require('mongoose');
const Product = require('./productModel');
const AppError = require('../utils/appError');

const requestSchema = new mongoose.Schema(
  {
    product: {
      type: mongoose.Schema.ObjectId,
      ref: 'Product',
      required: [true, 'Request should belongs to a product'],
    },
    quantityAsk: {
      type: Number,
      required: [true, 'How many products you want?'],
    },
    quantityProvide: {
      type: Number,
    },
    department: {
      type: String,
      required: [true, 'Department name is required'],
    },
    user: {
      type: mongoose.Schema.ObjectId,
      ref: 'User',
      required: [true, 'User is required'],
    },
    status: {
      type: String,
      enum: ['pending', 'accepted', 'rejected'],
      default: 'pending',
    },
    description: String,
  },
  { timestamps: true }
);

const checkStockAvailability = async (productId, quantityProvide) => {
  // Get products
  const product = await Product.findById(productId).select('inStock');
  if (!product) throw new AppError('Product not found!', 404);
  // Check does admin asking quantity is higher than the in stock quantity
  if (product.inStock < quantityProvide)
    throw new AppError('Your asked quantity is higher than in stock', 404);
};

// // check the requested asking product is in stock
// requestSchema.pre('save', async function (next) {
//   // get the product id
//   const { product: productId, quantityAsk } = this;
//   await checkStockAvailability(productId, quantityAsk);
//   next();
// });

// // when user want to update the asking quantity after requesting
// requestSchema.pre('findOneAndUpdate', async function (next) {
//   const { quantityAsk } = this.getUpdate();
//   if (quantityAsk) {
//     //  Get whole document from the db
//     const queryCondition = this.getQuery();
//     const {
//       product: { _id: productId },
//     } = await this.model.findOne(queryCondition);
//     await checkStockAvailability(productId, quantityAsk);
//   }

//   next();
// });

// Handle accepting the product request
requestSchema.pre('findOneAndUpdate', async function (next) {
  const { status, quantityProvide } = this.getUpdate();
  if (status === 'accepted') {
    //  Get whole document from the db
    const queryCondition = this.getQuery();
    const {
      quantityAsk,
      product: { _id: productId },
    } = await this.model.findOne(queryCondition);
    await checkStockAvailability(productId, quantityProvide);
    // reduct the product quantity
    await Product.findByIdAndUpdate(productId, {
      $inc: { inStock: -quantityProvide },
    });
  }

  next();
});

// populate the user and product in details
requestSchema.pre(/^find/, function (next) {
  this.populate('user', 'fullName department').populate(
    'product',
    'inStock name unitPrice category'
  );
  next();
});

//

module.exports = mongoose.model('Request', requestSchema);
