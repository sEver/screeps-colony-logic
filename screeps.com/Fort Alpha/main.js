var roleHarvester = require('role.harvester');
var roleUpgrader = require('role.upgrader');
var roleBuilder = require('role.builder');
var roleDrone = require('role.drone');
 
const TARGET_NUMBER_OF_HARVESTERS = 2;
const TARGET_NUMBER_OF_UPGRADERS = 1;

function countCreepsWithRole(role) {
    var creepsFiltered = _.filter(Game.creeps, (creep) => creep.memory.role == role);
    console.log(role + ' creep number: ' + creepsFiltered.length);
    return creepsFiltered;
}

module.exports.loop = function () {
    
    for(var name in Memory.creeps) {
        if(!Game.creeps[name]) {
            delete Memory.creeps[name];
            console.log('Clearing non-existing creep memory:', name);
        }
    }
    
    var harvesters = countCreepsWithRole('harvester');
    var upgraders = countCreepsWithRole('upgrader')
    var drones = countCreepsWithRole('drone');

    if((harvesters.length + drones.length) < TARGET_NUMBER_OF_HARVESTERS) {
        var newName = 'Harvester' + Game.time;
        console.log('Spawning new harvester: ' + newName);
        Game.spawns['Spawn1'].spawnCreep([WORK,CARRY,MOVE], newName, 
            {memory: {role: 'harvester'}});        
    }

    if(upgraders.length < TARGET_NUMBER_OF_UPGRADERS) {
        var newName = 'Upgrader' + Game.time;
        console.log('Spawning new upgrader: ' + newName);
        Game.spawns['Spawn1'].spawnCreep([WORK,CARRY,MOVE], newName, 
            {memory: {role: 'upgrader'}});        
    }
    
    if(Game.spawns['Spawn1'].spawning) { 
        var spawningCreep = Game.creeps[Game.spawns['Spawn1'].spawning.name];
        Game.spawns['Spawn1'].room.visual.text(
            '🛠️' + spawningCreep.memory.role,
            Game.spawns['Spawn1'].pos.x + 1, 
            Game.spawns['Spawn1'].pos.y, 
            {align: 'left', opacity: 0.8});
    }
    
    for(var name in Game.creeps) {
        var creep = Game.creeps[name];
        if(creep.memory.role == 'harvester') {
            roleHarvester.run(creep);
        }
        if(creep.memory.role == 'upgrader') {
            roleUpgrader.run(creep);
        }
        if(creep.memory.role == 'builder') {
            roleBuilder.run(creep);
        }
        if(creep.memory.role == 'drone') {
            roleDrone.run(creep);
        }

    }
}