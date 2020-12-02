const express = require('express');
const itemController = require('../controllers/itemController');

const authController = require('../controllers/authController');

const router = express.Router({
  mergeParams: true
});

router
  .route('/')
  .get(
    authController.protect,
    authController.restrictTo('user', 'admin', 'moderator'),
    itemController.getAllItems
  )
  .post(
    authController.protect,
    authController.restrictTo('admin', 'moderator'),
    itemController.createItem
  );

router
  .route('/:id')
  .get(
    authController.protect,
    authController.restrictTo('user', 'admin', 'moderator'),
    itemController.getItem
  )
  .patch(
    authController.protect,
    authController.restrictTo('admin', 'moderator'),
    itemController.updateItem
  )
  .delete(
    authController.protect,
    authController.restrictTo('admin', 'moderator'),
    itemController.deleteItem
  );

module.exports = router;
