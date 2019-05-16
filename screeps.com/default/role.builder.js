var roleHarvester = require('role.harvester');
var roleUpgrader = require('role.upgrader');
var roleBuilder = {
    /** @param {Creep} creep **/
    run: function(creep) {
        this.determineMission(creep);
	    if (creep.memory.mission == "build") {
	        creep.say('BB');
            if(this.build(creep)!=OK){
                roleUpgrader.upgrade(creep);
            }; 
	    } else {
	        creep.say('BH');
	        roleHarvester.harvest(creep);
	    }
	},
	
	determineMission: function(creep) {
	    if (!creep.memory.mission) {
	        creep.memory.mission = "build";
	    }
	    if (creep.memory.mission != "harvest" && creep.carry.energy == 0) {
            creep.memory.mission = "harvest"
            creep.say('ð harvest');
	    }
	    if (creep.memory.mission != "build" && creep.carry.energy == creep.carryCapacity) {
	        creep.memory.mission = "build"
	        creep.say('ð§ build');
	    }
	},	
	
	build: function(creep) {
        var targets = creep.room.find(FIND_CONSTRUCTION_SITES);
        if (targets.length) {
            var closestSite = creep.pos.findClosestByPath(FIND_CONSTRUCTION_SITES);
            if (creep.build(closestSite) == ERR_NOT_IN_RANGE) {
                creep.moveTo(closestSite, {visualizePathStyle: {stroke: '#FF00FF'}});
            }
            return 0;
        } else {// no build sites found
            return -1;
        }
	}
};

module.exports = roleBuilder;