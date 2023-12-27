const router = require('express').Router();
const productControllers = require('../controllers/productController');
const { protect, restrictTo } = require('../controllers/authController');

router.use(protect);

router
  .route('/')
  .post(restrictTo('super-admin'), productControllers.create)
  .get(restrictTo('super-admin', 'admin'), productControllers.getAll);
router.get('/search', productControllers.searchProducts);
router
  .route('/:id')
  .get(productControllers.getOne)
  .patch(restrictTo('super-admin'), productControllers.update)
  .delete(restrictTo('super-admin'), productControllers.delete);

module.exports = router;
