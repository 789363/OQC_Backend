const express = require('express');
const router = express.Router();
const {
    getAllItems,
    getItemsById,
    createItem,
    updateItem,
    deleteItem
} = require('../controllers/itemInfoController');

router.get('/items', getAllItems);
router.get('/items/:id', getItemsById);
router.post('/items', createItem);
router.put('/items/:id', updateItem);
router.delete('/items/:id', deleteItem);

module.exports = router;
