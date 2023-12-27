const router = require('express').Router();
const { protect, restrictTo } = require('../controllers/authController');
const statsControllers = require('../controllers/statsController');

router.use(protect);

router.get('/totals', statsControllers.getTotalStats);

router.get(
  '/dept-assign',
  restrictTo('super-admin'),
  statsControllers.getDepartmentProductAssignStats
);
router.get(
  '/dept-cost',
  restrictTo('super-admin'),
  statsControllers.getDepartmentProductCostStats
);

module.exports = router;
