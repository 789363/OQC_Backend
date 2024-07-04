const OpInfo = require('./OpInfo');
require('dotenv').config();

async function createManageUser() {
    try {
        const adminExists = await OpInfo.findOne({ where: { op_name: 'manage' } });
        if (!adminExists) {
            await OpInfo.create({
              op_id:"ekroot",
              op_name:"manage"     
            });
            console.log('Manage user created successfully.');
        }
    } catch (error) {
        console.error('Error creating Manage:', error);
    }
}

module.exports = createManageUser;
