const router = require('express').Router();
const { protect, restrictTo } = require('../controllers/authController');
const settingControllers = require('../controllers/settingController');

router.use(protect);

router.get('/', settingControllers.getAll);

router.use(restrictTo('super-admin'));

router.patch('/:id', settingControllers.update);

module.exports = router;
