var roleHarvester = require('role.harvester');
var roleUpgrader = require('role.upgrader');
var roleBuilder = require('role.builder');
var roleDrone = require('role.drone');

var creepDirector = {
  run: function() {
    Object.values(Game.creeps).forEach((creep) => {
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
    });
  }
}

module.exports = creepDirector
