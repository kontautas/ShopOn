const fs = require('fs');

const Item = require('../models/itemModel');

exports.getAllItems = async (req, res) => {
  try {
    let items;
    if (!req.params.categoriesId) {
      items = await Item.find();
    } else {
      items = await Item.find({
        category: `${req.params.categoriesId}`
      });
    }
    res.status(200).json({
      status: 'success',
      results: items.length,
      data: {
        items
      }
    });
  } catch (err) {
    res.status(404).json({
      status: err
    });
  }
};

exports.getItem = async (req, res) => {
  try {
    const item = await Item.findById(req.params.id);
    res.status(200).json({
      status: 'success',
      data: {
        item
      }
    });
  } catch (err) {
    res.status(404).json({
      status: 'failed'
    });
  }
};

exports.createItem = async (req, res) => {
  try {
    const newItem = await Item.create(req.body);
    res.status(201).json({
      status: 'success',
      data: {
        item: newItem
      }
    });
  } catch (err) {
    res.status(400).json({
      status: 'failed',
      message: 'Invalid data sent'
    });
  }
};

exports.updateItem = async (req, res) => {
  try {
    const item = await Item.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    });

    res.status(200).json({
      status: 'success',
      data: {
        item: item
      }
    });
  } catch (err) {
    res.status(400).json({
      status: 'failed'
    });
  }
};

exports.deleteItem = async (req, res) => {
  try {
    await Item.findByIdAndDelete(req.params.id);
    res.status(204).json({
      status: 'success'
    });
  } catch (err) {
    res.status(400).json({
      status: 'failed'
    });
  }
};
