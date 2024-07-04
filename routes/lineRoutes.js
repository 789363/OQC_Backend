const express = require('express');
const router = express.Router();
const {
    getAllLines,
    getLineById,
    createLine,
    updateLine,
    deleteLine
} = require('../controllers/lineInfoController');

router.get('/lines', getAllLines);
router.get('/lines/:id', getLineById);
router.post('/lines', createLine);
router.put('/lines/:id', updateLine);
router.delete('/lines/:id', deleteLine);

module.exports = router;
