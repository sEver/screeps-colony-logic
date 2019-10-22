var aishaAppearance = require('aisha.appearance');
var aishaPerception = require('aisha.perception');
var aishaConfig = require('aisha.config');
module.exports = {
  move: function(creep, ...args) {
    if(!aishaPerception.isStructurePresentAtPosition(
      creep.room, creep.pos.x, creep.pos.y, STRUCTURE_ROAD)
    ) {
      this.registerTrafficData(creep);
    }

    creep.moveTo(...args);
  },

  registerTrafficData: function(creep) {
    if(creep.room.memory.traffic === undefined) creep.room.memory.traffic = {};
    let x_y = `${creep.pos.x}_${creep.pos.y}`;
    if(creep.room.memory.traffic[x_y] === undefined) {
      creep.room.memory.traffic[x_y] = 1;
    } else {
      creep.room.memory.traffic[x_y] += 1;
    }
  },

  harvest: function(creep) {
    var sources = creep.room.find(FIND_SOURCES);
    var closestSource = creep.pos.findClosestByPath(sources, {filter: source => source.energy > 0});
    var status = creep.harvest(closestSource);
    if (status == ERR_NOT_IN_RANGE) {
      this.move(creep, closestSource, {visualizePathStyle: aishaAppearance.styles.paths.harvest});
      status = OK;
    }
    return status;
  },

  store: function(creep) {
    let chargableStructures = creep.room.find(FIND_STRUCTURES, {
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
      let targetStructure = creep.pos.findClosestByPath(chargableStructures);
      let status = creep.transfer(targetStructure, RESOURCE_ENERGY);
      if (status == ERR_NOT_IN_RANGE) {
        this.move(creep, targetStructure, {visualizePathStyle: aishaAppearance.styles.paths.store});
        status = OK;
      }
      return status;
    }
  },

  upgrade: function(creep) {
    let status = creep.upgradeController(creep.room.controller)
    if (status == ERR_NOT_IN_RANGE) {
      this.move(creep, creep.room.controller, {visualizePathStyle: aishaAppearance.styles.paths.upgrade});
      status = OK;
    }
    return status;
  },

  build: function(creep) {
    // FIXME: SO WASTEFULL TO CALL THAT TWICE!
    let targets = creep.room.find(FIND_CONSTRUCTION_SITES);
    if (targets.length) {
      let closestSite = creep.pos.findClosestByPath(FIND_CONSTRUCTION_SITES);
      let status = creep.build(closestSite);
      if (status == ERR_NOT_IN_RANGE) {
        creep.moveTo(closestSite, {visualizePathStyle: aishaAppearance.styles.paths.build});
        status = OK;
      }
      return status;
    } else {// no build sites found
      return ERR_NOT_FOUND;
    }
  },

  repair: function(creep) {
    if(creep.memory.targetId === undefined) {
      let structuresToRepair = aishaPerception.structuresRequiringRepair(creep.room);
      creep.memory.targetId = creep.pos.findClosestByRange(structuresToRepair).id;
    }
    let target = Game.getObjectById(creep.memory.targetId);

    if(target) {
      if(target.hits === target.hitsMax || target.hits > aishaConfig.comfortableStructureHp) {
        delete creep.memory.targetId;
      }
      let status = creep.repair(target)
      if(status == ERR_NOT_IN_RANGE) {
        creep.moveTo(target, {visualizePathStyle: aishaAppearance.styles.paths.repair})
        status = OK;
      }
      return status;
    } else {
      return ERR_NOT_FOUND;
    }
  }

}
