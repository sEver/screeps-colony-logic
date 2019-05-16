var roleHarvester = {

    /** @param {Creep} creep **/
    run: function(creep) {
        // if not full - harvest
	    if(creep.carry.energy < creep.carryCapacity) {
            var sources = creep.room.find(FIND_SOURCES);
            if(creep.harvest(sources[0]) == ERR_NOT_IN_RANGE) {
                creep.moveTo(sources[0], {visualizePathStyle: {stroke: '#ffaa00'}});
            }
        // when full
        } else {
            // look for chargable structures
            var chargableStructures = creep.room.find(FIND_STRUCTURES, {
                    filter: (structure) => {
                        return (
                                structure.structureType == STRUCTURE_EXTENSION || 
                                structure.structureType == STRUCTURE_SPAWN
                            ) &&
                            structure.energy < structure.energyCapacity;
                    }
            });
            
            // if found - charge these structures
            if(chargableStructures.length > 0) {
                if(creep.transfer(chargableStructures[0], RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(chargableStructures[0], {visualizePathStyle: {stroke: '#ffffff'}});
                }
            } else {
                creep.memory.role = 'drone';
            }
        }
	}
};

module.exports = roleHarvester;