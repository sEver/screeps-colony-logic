module.exports = {
  moveTo: function(creep, ...args) {

  },

  harvest: function(creep) {
    var sources = creep.room.find(FIND_SOURCES);
    var closestSource = creep.pos.findClosestByPath(sources, {filter: source => source.energy > 0});
    var status = creep.harvest(closestSource);
    if (status == ERR_NOT_IN_RANGE) {
      creep.moveTo(closestSource, {visualizePathStyle: {stroke: '#ffaa00'}});
      return OK;
    } else {
      return status;
    }
  },

  store: function(creep) {
    var chargableStructures = creep.room.find(FIND_STRUCTURES, {
      filter: (structure) => {
        return (
          structure.structureType == STRUCTURE_EXTENSION ||
          structure.structureType == STRUCTURE_SPAWN
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
      return OK;
    } else {// no chargable structures found
      return ERR_NOT_FOUND;
    }
  },

}
