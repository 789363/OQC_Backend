const express = require('express');
const router = express.Router();
const {
    getAllResults,
    getResultById,
    createResult,
    updateResult,
    deleteResult
} = require('../controllers/resultInfoController');

router.get('/results', getAllResults);
router.get('/results/:id', getResultById);
router.post('/results', createResult);
router.put('/results/:id', updateResult);
router.delete('/results/:id', deleteResult);

module.exports = router;
