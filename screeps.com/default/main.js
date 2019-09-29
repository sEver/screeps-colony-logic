var creepDirectorLogic = require('logic.director.creeps');
var towerDirectorLogic = require('logic.director.towers');
var structureSpawner = require('structure.spawner');
var utilities = require('utilities.creeps');

module.exports.loop = function () {
  for(let spawn in Game.spawns) {
    structureSpawner.run(Game.spawns[spawn]);
    console.log(`Running spawner: "${Game.spawns[spawn].name}" in room: "${Game.spawns[spawn].room.name}"`)
  }

  Object.values(Game.rooms).forEach((room)=>{
    towerDirectorLogic.run(room);
    creepDirectorLogic.run(room);
    console.log(`Running room: ${room.name}`);
  });

  if (Game.time % 50 == 0) {
    utilities.clearMemoryOfDeadCreeps();
    //utilities.pruneListOfEmptyTombStones();
  }
}
