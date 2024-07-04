const MachineInfo = require('../models/MachineInfo');

exports.getAllMachines = async (req, res) => {
    try {
        const machines = await MachineInfo.findAll();
        res.json(machines);
    } catch (error) {
        res.status(500).send(error.message);
    }
};

exports.getMachineById = async (req, res) => {
    try {
        const machine = await MachineInfo.findByPk(req.params.id);
        if (machine) {
            res.json(machine);
        } else {
            res.status(404).send('Machine not found');
        }
    } catch (error) {
        res.status(500).send(error.message);
    }
};

exports.createMachine = async (req, res) => {
    try {
        const machine = await MachineInfo.create(req.body);
        res.status(201).json(machine);
    } catch (error) {
        res.status(400).send(error.message);
    }
};

exports.updateMachine = async (req, res) => {
    try {
        const result = await MachineInfo.update(req.body, {
            where: { machine_id: req.params.id }
        });
        if (result[0] === 1) {
            res.send('Machine updated successfully');
        } else {
            res.status(404).send('Machine not found');
        }
    } catch (error) {
        res.status(400).send(error.message);
    }
};

exports.deleteMachine = async (req, res) => {
    try {
        const result = await MachineInfo.destroy({
            where: { machine_id: req.params.id }
        });
        if (result === 1) {
            res.send('Machine deleted successfully');
        } else {
            res.status(404).send('Machine not found');
        }
    } catch (error) {
        res.status(500).send(error.message);
    }
};
