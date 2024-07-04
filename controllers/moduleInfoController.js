const { ModuleInfo, ItemInfo, OpInfo } = require('../models/index');
const CheckItems = require('../models/CheckInfo'); 

exports.getSetModule = async (req, res) => {
    const opId = req.params.id; 
    try {
      const modules = await ModuleInfo.findAll({
        include: [{
          model: OpInfo,
          attributes: ['op_id'], 
          through: {
            attributes: []
          }
        }]
      });
  
      const filteredModules = modules.filter(module =>
        module.OpInfos.some(op => op.op_id.toString() === opId)
      );
  
   
      const result = filteredModules.map(module => ({
        modelId: module.module_id,
        modelName: module.module_name,
        canEditOPID: module.OpInfos.map(op => op.op_id) 
      }));
  
      res.json(result);
    } catch (error) {
      console.error('Error fetching modules by op ID:', error);
      res.status(500).send('Internal Server Error');
    }
  };

exports.getAllModules = async (req, res) => {
    try {
        const modules = await ModuleInfo.findAll();
        res.json(modules);
    } catch (error) {
        res.status(500).send(error.message);
    }
};

exports.getAllSetModules = async (req, res) => {
    try {
        const modules = await ModuleInfo.findAll({
          include: [{
            model: OpInfo,
            attributes: ['op_id'], 
            through: {
              attributes: [] 
            }
          }]
        });
  
        const result = modules.map(module => ({
          modelId: module.module_id,
          modelName: module.module_name,
          canEditOPID: module.OpInfos.map(op => op.op_id)  
        }));
    
        res.json(result);
      } catch (error) {
        console.error('Error fetching modules:', error);
        res.status(500).send('Internal Server Error');
      }
    };

exports.getModuleById = async (req, res) => {
    try {
        const module = await ModuleInfo.findByPk(req.params.id, {
            include: [{
                model: CheckItems, 
                as: 'checkItems' 
            }, {
                model: ItemInfo, 
                as: 'items' 
            }]
        });
        if (module) {
            res.json(module);
        } else {
            res.status(404).send('Module not found');
        }
    } catch (error) {
        res.status(500).send(error.message);
    }
};

exports.createModule = async (req, res) => {
    try {
        const module = await ModuleInfo.create(req.body);
        res.status(201).json(module);
    } catch (error) {
        res.status(400).send(error.message);
    }
};

exports.updateModule = async (req, res) => {
  try {
      const { module_name } = req.body;
      const id = req.params.id;

      const result = await ModuleInfo.update({ module_name }, {
          where: { module_id: id }
      });

      if (result[0] === 1) { 
          const updatedModule = await ModuleInfo.findOne({ where: { module_id: id } });
          res.status(200).json(updatedModule); 
      } else {
          res.status(404).send('Module not found');
      }
  } catch (error) {
      res.status(400).send(error.message);
  }
};

exports.deleteModule = async (req, res) => {
    try {
        const result = await ModuleInfo.destroy({
            where: { module_id: req.params.id }
        });
        if (result === 1) {
            res.send('Module deleted successfully');
        } else {
            res.status(404).send('Module not found');
        }
    } catch (error) {
        res.status(500).send(error.message);
    }
};
