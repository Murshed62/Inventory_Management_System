const router = require("express").Router();
const categoryControllers = require("../controllers/categoryController");
const { protect, restrictTo } = require("../controllers/authController");

router.use(protect);

router
  .route("/")
  .post(restrictTo("super-admin"), categoryControllers.create)
  .get(restrictTo("super-admin", "admin"), categoryControllers.getAll);

router.use(restrictTo("super-admin"));
router
  .route("/:id")
  .get(categoryControllers.getOne)
  .patch(categoryControllers.update)
  .delete(categoryControllers.delete);

module.exports = router;
