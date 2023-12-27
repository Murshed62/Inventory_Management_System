const express = require("express");
const userController = require("./../controllers/userController");
const authController = require("./../controllers/authController");
const router = express.Router();

router.post("/signup", authController.signup);
router.post("/login", authController.login);
router.get("/logout", authController.logout);

// Protect all routes after this middleware
router.use(authController.protect);

/*=========
Common operations
=========== */
router.patch("/update-password", authController.updatePassword);
router.get("/me", userController.getMe, userController.getUser);
router.patch("/update-me", userController.updateMe);

/*=================
Actions of department admin
1) Login (credentials provided by the super admin)
2) Logout
3) Request for product
4) See his department assign products
5) See requests status
6) View Products (or inventory for request)
7) Filter products (filterBy- Category, quantity)
8) Search products
9) Update his/her profile (password, name etc)
================== */

/*=================
Actions of Super admin
1) Login
2) Logout
3) CRUD category
4) See all categories
5) CURD products
6) CURD Inventory
7) Filter products (filterBy- Category, quantity)
8) Search products
9) Accept or reject request
10) Create department admin
11) Delete department admin
================== */

router.use(authController.restrictTo("super-admin"));
router
  .route("/dept-admin")
  .get(userController.getAllUsers)
  .post(userController.createDeptAdmin);
router
  .route("/dept-admin/:id")
  .patch(userController.updateUser)
  .get(userController.getUser)
  .delete(userController.deleteUser);

module.exports = router;
