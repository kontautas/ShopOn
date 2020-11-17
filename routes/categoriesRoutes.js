const express = require('express');
const categoriesController = require('../controllers/categoriesController');
const authController = require('../controllers/authController');
const itemRouter = require('../routes/itemRoutes');

const router = express.Router();

router.use('/:categoriesId/items', itemRouter);

router
  .route('/')
  .get(
    authController.protect,
    authController.restrictTo('user', 'admin', 'moderator'),
    categoriesController.getAllCategories
  )
  .post(
    authController.protect,
    authController.restrictTo('admin', 'moderator'),
    categoriesController.createCategory
  );

router
  .route('/:id')
  .get(
    authController.protect,
    authController.restrictTo('user', 'admin', 'moderator'),
    categoriesController.getCategory
  )
  .patch(
    authController.protect,
    authController.restrictTo('admin', 'moderator'),
    categoriesController.updateCategory
  )
  .delete(
    authController.protect,
    authController.restrictTo('admin', 'moderator'),
    categoriesController.deleteCategory
  );

module.exports = router;
