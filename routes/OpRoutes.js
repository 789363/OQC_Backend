const express = require('express');
const router = express.Router();
const {
    getAllOps,
    getOpById,
    createOp,
    updateOp,
    deleteOp
} = require('../controllers/OpInfoController');

router.get('/ops', getAllOps);
router.get('/ops/:id', getOpById);
router.post('/ops/:id', createOp);
router.put('/ops/:id', updateOp);
router.delete('/ops/:id', deleteOp);

module.exports = router;
