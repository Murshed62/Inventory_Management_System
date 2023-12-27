const mongoose = require('mongoose');
const settingSchema = new mongoose.Schema(
  {
    request: {
      type: Boolean,
      default: true,
    },
    notification: {
      type: Boolean,
      default: false,
    },
    passwordChange: {
      type: Boolean,
      default: true,
    },
    maxProductRequest: {
      type: Number,
      default: 5,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Setting', settingSchema);
