var roleHarvester = require('role.harvester');
var roleUpgrader = require('role.upgrader');
var roleBuilder = require('role.builder');
var roleDrone = require('role.drone');

var creepDirector = {
  run: function() {
    for (var name in Game.creeps) {
      var creep = Game.creeps[name];
      switch(creep.memory.role) {
        case 'harvester':
          roleHarvester.run(creep);
          break;
        case 'drone':
          roleDrone.run(creep);
          break;
        case 'upgrader':
          roleUpgrader.run(creep);
          break;
        case 'builder':
          roleBuilder.run(creep);
          break;
      }
    }
  }
}

module.exports = creepDirector
