var aishaAppearance = require('aisha.appearance');

module.exports = {
  moveTo: function(creep, ...args) {

  },

  harvest: function(creep) {
    var sources = creep.room.find(FIND_SOURCES);
    var closestSource = creep.pos.findClosestByPath(sources, {filter: source => source.energy > 0});
    var status = creep.harvest(closestSource);
    if (status == ERR_NOT_IN_RANGE) {
      creep.moveTo(closestSource, {visualizePathStyle: aishaAppearance.styles.paths.harvest});
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
        creep.moveTo(targetStructure, {visualizePathStyle: aishaAppearance.styles.paths.store});
      }
      return OK;
    } else {// no chargable structures found
      return ERR_NOT_FOUND;
    }
  },

  upgrade: function(creep) {
    if (creep.upgradeController(creep.room.controller) == ERR_NOT_IN_RANGE) {
      creep.moveTo(creep.room.controller, {visualizePathStyle: aishaAppearance.styles.paths.upgrade});
    } else if (creep.upgradeController(creep.room.controller) == OK) {
      return 0;
    } else {
      return -1;
    }
  },

  build: function(creep) {
    var targets = creep.room.find(FIND_CONSTRUCTION_SITES);
    if (targets.length) {
      var closestSite = creep.pos.findClosestByPath(FIND_CONSTRUCTION_SITES);
      if (creep.build(closestSite) == ERR_NOT_IN_RANGE) {
        creep.moveTo(closestSite, {visualizePathStyle: aishaAppearance.styles.paths.build});
      }
      return 0;
    } else {// no build sites found
      return -1;
    }
  }

}
