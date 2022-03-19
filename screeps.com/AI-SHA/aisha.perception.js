var aishaAppearance = require('aisha.appearance');
var aishaConfig = require('aisha.config');

module.exports = {

  scanRoom: function(room) {
    if(!room.memory.sources) room.memory.sources = {};
    var sources = room.find(FIND_SOURCES);
    sources.forEach((source) => {
      if (!(source.id in room.memory.sources)) {
        console.log(`ADDING ${source.id}`)
        room.memory.sources[source.id] = {pos: JSON.parse(JSON.stringify(source.pos))};
        console.log(Object.entries(room.memory.sources[source.id]))
      }
      // source.pos,
      // energy,
      // energyCapacity
      // id, //Game.getObjectById
      // ticksToRegeneration,

      room.visual.text(
        `${source.energy}`,
        source.pos.x, source.pos.y-1, { color: aishaAppearance.colors.energy }
      );
      if(source.ticksToRegeneration) {
        room.visual.text(
          `${source.ticksToRegeneration}`,
          source.pos.x+2, source.pos.y, { color: '#aaa', backgroundColor: '#222', opacity: 0.6 } //// FIXME: Move this to styles
        );
      }
    });

    room.memory.energyInAllSources = sources.reduce((acc, cur) => acc + cur.energy, 0);
    room.memory.structuresRequiringRepairIds = this.structuresRequiringRepair(room).map(struct => struct.id).slice(0,10);
  },

  isStructurePresentAtPosition: function(room, x, y, structureType) {
    let structuresPresent = room.lookForAt(LOOK_STRUCTURES, x, y);
    let structuresOfGivenTypePresent =
      structuresPresent.filter(structure => structure.structureType == structureType);
    return structuresOfGivenTypePresent.length > 0;
  },

  structuresRequiringUrgentRepair: function(room) {
    var structuresForUrgentRepair = room.find(FIND_STRUCTURES, {
      filter: structure => {
        const isItAStructureAtCriticalIntegrity =
          (
            structure.structureType == STRUCTURE_ROAD ||
            structure.structureType == STRUCTURE_RAMPART ||
            structure.structureType == STRUCTURE_WALL
          ) && (
            structure.hits < structure.hitsMax * 0.2 &&
            structure.hits < aishaConfig.minimumStructureHp
          );

        const isItAStructureInNeedOfATopUp =
          structure.hits < structure.hitsMax
          &&
          [
            STRUCTURE_CONTAINER,
            STRUCTURE_STORAGE,
            STRUCTURE_EXTENSION,
            STRUCTURE_SPAWN,
            STRUCTURE_TOWER
          ].includes(structure.structureType);

        return isItAStructureAtCriticalIntegrity || isItAStructureInNeedOfATopUp;
      }
    });
    return structuresForUrgentRepair;
  },

  structuresRequiringRepair: function(room) {
    // TODO: Add caching here.
    var structuresForRepair = room.find(FIND_STRUCTURES, {
      filter: structure => {
        const isItAStructureAtSuboptimalIntegrity = (
          structure.hits < structure.hitsMax * 0.8 &&
          structure.hits < aishaConfig.comfortableStructureHp
        );

        return isItAStructureAtSuboptimalIntegrity;
      }
    });

    structuresForRepair.sort((a, b) => a.hits/a.hitsMax - b.hits/b.hitsMax);

    return structuresForRepair;
  },

}
