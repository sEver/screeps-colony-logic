var roleHarvester = {
    /** @param {Creep} creep **/
    run: function(creep) {
        this.determineMission(creep);
	    if (creep.memory.mission == 'deliver') {
	        creep.say('HD');
            this.deliverEnergy(creep);// if there is nowhere to deliver the energy, this just stops
        } else {
            creep.say('HH');
            this.harvest(creep);
        }
	},
	
	determineMission: function(creep) {
	    if (!creep.memory.mission) {
	        creep.memory.mission = 'harvest';
	    }
	    if (creep.memory.mission != 'harvest' && creep.carry.energy == 0) {
            creep.memory.mission = 'harvest';
            creep.say('🔄 harvest');
	    } 
	    if (creep.memory.mission != 'deliver' && creep.carry.energy == creep.carryCapacity) {
	        creep.memory.mission = 'deliver';
            creep.say('⚡ deliver');
	    } 
	},
	
	harvest: function(creep) {
	    //*
	    if(this.scavenge(creep) == 0) {
	        return 0;
	    }/**/
	    return this.harvestSmarter(creep);

        var closestSource = creep.pos.findClosestByPath(FIND_SOURCES);
        var status = creep.harvest(closestSource);
        if (status == ERR_NOT_IN_RANGE) {
            creep.moveTo(closestSource, {visualizePathStyle: {stroke: '#ffaa00'}});
        }
        return 0;
	},
	
	scavenge: function(creep) {
	    //return -1;
	    var tombstones = creep.room.find(FIND_TOMBSTONES);
	    var resources = creep.room.find(FIND_DROPPED_RESOURCES);
	    var targets = tombstones.concat(resources);
	    
	    if (!targets.length) {
	        return -1;
	    }
	    
	    if (resources.length) {
	        var closestTarget = creep.pos.findClosestByPath(resources);
	        var status = creep.pickup(closestTarget);
	    } else
	    if (tombstones.length) {
	        tombstones = this.eliminateEmptyTombstones(tombstones);
	        var closestTarget = creep.pos.findClosestByPath(tombstones);
	        var status = creep.withdraw(closestTarget, RESOURCE_ENERGY);
            if(status == ERR_NOT_ENOUGH_RESOURCES) {// it's an empty TombStone
                console.log('Empty Tombstone '+creep.name);
                this.registerEmptyTombstone(closestTarget);
                return -1;
            }
	    }

        if (status == ERR_NOT_IN_RANGE) {
            creep.moveTo(closestTarget, {visualizePathStyle: {stroke: '#ff0000'}});
        } else {
            console.log('scavenge:'+ status);
        }
        if (status == ERR_INVALID_TARGET) {
            return -1;
        }
	    return 0;
	},
	
	registerEmptyTombstone: function(target){
	    if(Memory.emptyTombstones == undefined) {
	        Memory.emptyTombstones = [];
	    } else {
	        if(!this.isTombstoneEmpty(target)) {
	            Memory.emptyTombstones.push(target.id);
	        }
	    }
	},
	
	isTombstoneEmpty: function(target) {
	    if(Memory.emptyTombstones == undefined) {
	        return false;
	    } else {
	        return Memory.emptyTombstones.includes(target.id);
	    }
	},
	
	eliminateEmptyTombstones: function(tombstones) {
	    var nonEmptyTombstones = tombstones.filter(tombstone => !this.isTombstoneEmpty(tombstone));
	    return nonEmptyTombstones;
	},
	
	harvestSmarter: function(creep) {
	    var sources = creep.room.find(FIND_SOURCES);
	    var closestSource = creep.pos.findClosestByPath(sources, {filter: source => source.energy > 0});
	    //closestSource = sources[0];
	    //*
	    if(!closestSource) {
	        return -1;
	    }/**/
        var status = creep.harvest(closestSource);
        if (status == ERR_NOT_IN_RANGE) {
            creep.moveTo(closestSource, {visualizePathStyle: {stroke: '#ffaa00'}});
        }
        return 0;
	},
	
	harvestSmart: function(creep) {
	    if(!Memory.sources){
	        var sources = creep.room.find(FIND_SOURCES);
	        var sourcesMinified = sources.map(source => {return {energy: source.energy, pos: source.pos, id: source.id}});
	        Memory.sources = sourcesMinified;
	        Memory.sourcesLastUpdated = Game.time;
	        //console.log(JSON.stringify(Memory.sources));
	    } else {
	        if(Game.time > Memory.sourcesLastUpdated + 5) {
    	        Memory.sources = Memory.sources.map(source => {return Object.assign(source, {energy: Game.getObjectById(source.id).energy})});
    	        Memory.sourcesLastUpdated = Game.time;
    	        //console.log(JSON.stringify(Memory.sources));
	        }
	    }
	    var nonEmptySources = Memory.sources.filter(source => source.energy != 0);
	    if (nonEmptySources.length) {
	        //console.log('NoNEmpty:');
	        //console.log(JSON.stringify(nonEmptySources));
	        var chosenSourceId = nonEmptySources[0].id;
	        console.log(chosenSourceId);
            var chosenSource = Game.getObjectById(chosenSourceId);
            var status = creep.harvest(chosenSource);
            if (status == ERR_NOT_IN_RANGE) {
                creep.moveTo(chosenSource, {visualizePathStyle: {stroke: '#ffaa00'}});
            }
            return 0;
	    } else {
            return -1;
	    }
	},
	
	deliver: function(creep) {
	    if(_.sum(creep.carry) > creep.carry.energy){
    	    if (this.deliverCargo(creep) == OK) {
    	        return 0;
    	    } else {
    	        return -1;
    	    }
	    } else {
	        return this.deliverEnergy(creep);    
	    }
	},
	
	deliverCargo: function(creep) {
        var storageStructures = creep.room.find(FIND_STRUCTURES, {
                filter: (structure) => {
                    return (
                        structure.structureType == STRUCTURE_CONTAINER 
                    ) &&
                    _.sum(structure.store) < structure.storeCapacity;
                }
            }
        );
        if (storageStructures.length > 0) {
            var targetStructure = storageStructures[0];
            for(var resourceType in creep.carry) {
                if (resourceType == RESOURCE_ENERGY) {
                    continue;
                }
                if (creep.transfer(targetStructure, resourceType) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(targetStructure, {visualizePathStyle: {stroke: '#00ff00'}});
                }
            }
            return 0;
        } else {
            return -1;
        }
	},
	
	deliverEnergy: function(creep) {
        var chargableStructures = creep.room.find(FIND_STRUCTURES, {
                filter: (structure) => {
                    return (
                        structure.structureType == STRUCTURE_EXTENSION || 
                        structure.structureType == STRUCTURE_SPAWN ||
                        structure.structureType == STRUCTURE_TOWER
                    ) &&
                    structure.energy < structure.energyCapacity;
                }
        });
        
        if (chargableStructures.length > 0) {
            var targetStructure = chargableStructures[0];
            targetStructure = creep.pos.findClosestByPath(chargableStructures);
            if (creep.transfer(targetStructure, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                creep.moveTo(targetStructure, {visualizePathStyle: {stroke: '#ffffff'}});
            }
            return 0;
        } else {// no chargable structures found
            return -1;
        }
	}
};
module.exports = roleHarvester;