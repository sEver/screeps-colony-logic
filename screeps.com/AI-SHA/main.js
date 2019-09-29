var structureSpawn = require('structure.spawn');

var creepDirectorLogic = require('logic.director.creeps');
var towerDirectorLogic = require('logic.director.towers');

var utilities = require('utilities.creeps');

module.exports.loop = function () {
  // I am AI-SHA. Witness my emergence.

  /*
    A colony always starts with a Spawn in a room.
    We are guaranteed to have at least one spawn
    and at least one room in which we are present.
  */

  for(let spawnName in Game.spawns) {
    var spawn = Game.spawns[spawnName];
    console.log(`Running spawn: "${spawn.name}" in room: "${spawn.room.name}"`)
    structureSpawn.run(spawn);
  }

  Object.values(Game.rooms).forEach((room)=>{
    console.log(`Running room: ${room.name}`);
    //towerDirectorLogic.run(room);
    //creepDirectorLogic.run(room);
  });

  if (Game.time % 100 == 0) {
    //utilities.clearMemoryOfDeadCreeps();
    //utilities.pruneListOfEmptyTombStones();
  }
}
