const router = require('express').Router();
const requestControllers = require('../controllers/requestController');
const { protect, restrictTo } = require('../controllers/authController');
const { loggedInUserRequests } = require('./../middlewares/requestMiddlewares');

router.use(protect);

router.use(restrictTo('super-admin', 'admin'));
router
  .route('/')
  .post(requestControllers.create)
  .get(requestControllers.getAll);
router.get('/my', loggedInUserRequests, requestControllers.getAll);
router.get(
  '/count-pending',
  restrictTo('super-admin'),
  requestControllers.countPending
);
router
  .route('/:id')
  .get(requestControllers.getOne)
  .patch(requestControllers.update)
  .delete(requestControllers.delete);

module.exports = router;
