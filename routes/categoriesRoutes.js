const express = require('express');
const categoriesController = require('../controllers/categoriesController');
const itemRouter = require('../routes/itemRoutes');

const router = express.Router();

router.use('/:categoriesId/items', itemRouter);

router
    .route('/')
    .get(categoriesController.getAllCategories)
    .post(categoriesController.createCategory);

router
    .route('/:id')
    .get(categoriesController.getCategory)
    .patch(categoriesController.updateCategory)
    .delete(categoriesController.deleteCategory);

module.exports = router;