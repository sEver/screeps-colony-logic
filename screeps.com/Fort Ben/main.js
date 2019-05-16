var creepDirectorLogic = require('logic.director.creeps');
var towerDirectorLogic = require('logic.director.towers');
var structureSpawner = require('structure.spawner');
var utilities = require('utilities.creeps');

module.exports.loop = function () {
    structureSpawner.run();
    towerDirectorLogic.run();
    creepDirectorLogic.run();
    if (Game.time % 50 == 0) {
        utilities.clearMemoryOfDeadCreeps();
        utilities.pruneListOfEmptyTombStones();
    }
}