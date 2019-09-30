var structureSpawn = require('structure.spawn');
var structureTower = require('structure.tower');
var creepCommander = require('creep.commander');
var aishaPerception = require('aisha.perception');
var aishaAppearance = require('aisha.appearance');
var utilitiesCreeps = require('utilities.creeps');

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
    aishaPerception.scanRoom(room);
    structureTower.run(room);
    aishaAppearance.displayRoomDiagnostics(room);
  });

  Object.values(Game.creeps).forEach((creep)=>{
    console.log(`Directing creep: ${creep.name}`);
    creepCommander.run(creep);
  });

  if(Game.time % 60 === 0) {
    utilitiesCreeps.clearMemoryOfDeadCreeps();
  }

}
