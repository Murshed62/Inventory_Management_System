const Setting = require('../models/settingModel');
const factory = require('./handlerFactory');

exports.getAll = factory.getAll(Setting);
exports.update = factory.updateOne(Setting);
