const express = require('express');
const router = express.Router();
const {
    getAllMachines,
    getMachineById,
    createMachine,
    updateMachine,
    deleteMachine
} = require('../controllers/machineInfoController');

router.get('/machines', getAllMachines);
router.get('/machines/:id', getMachineById);
router.post('/machines', createMachine);
router.put('/machines/:id', updateMachine);
router.delete('/machines/:id', deleteMachine);

module.exports = router;
