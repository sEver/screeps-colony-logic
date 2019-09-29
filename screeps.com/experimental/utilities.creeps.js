var utilitiesCreeps = {
  countCreepsWithRole: (givenRole) => {
    var creepsFilteredByGivenRole = _.filter(Game.creeps, (creep) => creep.memory.role == givenRole);
    return creepsFilteredByGivenRole.length;
  },

  clearMemoryOfDeadCreeps: () => {
    for (var creepName in Memory.creeps) {
      if (!Game.creeps[creepName]) {
        delete Memory.creeps[creepName];
        console.log('Clearing non-existing creep memory:', creepName);
      }
    }
  },

  pruneListOfEmptyTombStones: () => {
    var initialLength = Memory.emptyTombstones.length;
    Memory.emptyTombstones = Memory.emptyTombstones.filter(emptyTombstone => Game.getObjectById(emptyTombstone) );
    var finalLength = Memory.emptyTombstones.length;
    console.log(`Pruned ${finalLength - initialLength} empty tombstones`);
  }
};

module.exports = utilitiesCreeps;
