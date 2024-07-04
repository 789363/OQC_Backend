const express = require('express');
const router = express.Router();
const {
    getAllModuleOps,
    getModuleOpById,
    createModuleOp,
    updateModuleOp,
    deleteModuleOp
} = require('../controllers/moduleOpController');


router.get('/moduleops/', getAllModuleOps);
router.get('/moduleops/:id', getModuleOpById);
router.post('/moduleops/', createModuleOp);
router.put('/moduleops/:id', updateModuleOp);
router.delete('/moduleops/:moduleId/:opId',deleteModuleOp);
module.exports = router;
