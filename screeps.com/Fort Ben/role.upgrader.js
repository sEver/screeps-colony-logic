var roleHarvester = require('role.harvester');
var roleUpgrader = {
    /** @param {Creep} creep **/
    run: function(creep) {
        this.determineMission(creep);
	    if (creep.memory.mission == "upgrade") {
	        creep.say('UU');
	        this.upgrade(creep);// you can always deliver energy to controller, so this never stops
        } else {
            creep.say('UH');
            roleHarvester.harvest(creep);
        }
	},
	
	determineMission: function(creep) {
	    if (!creep.memory.mission) {
	        creep.memory.mission = "harvest";
	    }
        // if upgrading and empty - switch to harvesting
        if (creep.memory.mission != "harvest" && creep.carry.energy == 0) {
            creep.memory.mission = "harvest";
            creep.say('🔄 harvest');
	    }
	    // if not upgrading and full - switch to upgrading
	    if (creep.memory.mission != "upgrade" && creep.carry.energy == creep.carryCapacity) {
	        creep.memory.mission = "upgrade";
	        creep.say('⚡ upgrade');
	    }	    
	},
	
	upgrade: function(creep) {
        if (creep.upgradeController(creep.room.controller) == ERR_NOT_IN_RANGE) {
            creep.moveTo(creep.room.controller, {visualizePathStyle: {stroke: '#ffffff'}});
        } else if (creep.upgradeController(creep.room.controller) == OK) {
            return 0;
        } else {
            return -1;
        }
	}
};

module.exports = roleUpgrader;