const express = require('express');
const router = express.Router();
const checkItemsController = require('../controllers/checkItemsController');

// Route to get all CheckItems
router.get('/checkitems', checkItemsController.getAllCheckItems);

// Route to get a single CheckItem by id
router.get('/checkitems/:id', checkItemsController.getCheckItemById);

// Route to create a new CheckItem
router.post('/checkitems', checkItemsController.createCheckItem);

// Route to update a CheckItem
router.put('/checkitems/:id', checkItemsController.updateCheckItem);

// Route to delete a CheckItem
router.delete('/checkitems/:id', checkItemsController.deleteCheckItem);

module.exports = router;
