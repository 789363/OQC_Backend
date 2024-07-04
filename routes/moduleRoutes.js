const express = require('express');
const router = express.Router();
const {
    getAllModules,
    getModuleById,
    createModule,
    updateModule,
    deleteModule,
    getSetModule,
    getAllSetModules
} = require('../controllers/moduleInfoController');

router.get('/modules', getAllModules);
router.get('/modules/:id', getModuleById);
router.get('/setmodules/', getAllSetModules);
router.get('/setmodules/:id', getSetModule);  // 使用新的getModule函数
router.post('/modules', createModule);
router.put('/modules/:id', updateModule);
router.delete('/modules/:id', deleteModule);


module.exports = router;
