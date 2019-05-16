/* DRONE 0.2 */
/* */
var roleUpgrader = require('role.upgrader');
var roleHarvester = require('role.harvester');
var roleBuilder = require('role.builder');
var roleDrone = {
    /** @param {Creep} creep **/
    run: function(creep) { 
        this.determineMission(creep);
        if (Game.time % 4 == 0) creep.say(creep.memory.role[0].toUpperCase() + creep.memory.mission[0].toUpperCase());
        switch (creep.memory.mission) {
            case 'deliver':
                if (roleHarvester.deliver(creep) != OK) {
                    creep.memory.mission = 'build';
                }
                break;
            case 'build':
                if (roleBuilder.build(creep) != OK) {
                    creep.memory.mission = 'upgrade';
                }
                break;
            case 'upgrade': 
                roleUpgrader.upgrade(creep);
                break;
            case 'harvest':
                if (roleHarvester.harvest(creep) != OK) {
                    creep.memory.mission = 'deliver';
                };
                break;
            default:
        }
	},
	determineMission: function(creep) {
	    if (_.sum(creep.carry) == 0) {
	        creep.memory.mission = 'harvest';
	    }
	    if (
            _.sum(creep.carry) == creep.carryCapacity &&
            creep.memory.mission != 'build' &&
            creep.memory.mission != 'upgrade'
	    ) {
	        creep.memory.mission = 'deliver';
	    }
	}
};
module.exports = roleDrone;