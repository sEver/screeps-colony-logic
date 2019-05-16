var utilitiesCreeps = {
    
    countCreepsWithRole: (role) => {
        var creepsFiltered = _.filter(Game.creeps, (creep) => creep.memory.role == role);
        //console.log(role + ' creep number: ' + creepsFiltered.length);
        return creepsFiltered.length;
    },
    
    clearMemoryOfDeadCreeps: () => {
        for (var name in Memory.creeps) {
            if (!Game.creeps[name]) {
                delete Memory.creeps[name];
                console.log('Clearing non-existing creep memory:', name);
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
