const express = require('express');
const router = express.Router();
const reasonInfoController = require('../controllers/reasonInfoController');

router.get('/reasons', reasonInfoController.getAllReasons);
router.get('/reasons/:id', reasonInfoController.getReasonById);
router.post('/reasons', reasonInfoController.createReason);
router.put('/reasons/:id', reasonInfoController.updateReason);
router.delete('/reasons/:id', reasonInfoController.deleteReason);

module.exports = router;
