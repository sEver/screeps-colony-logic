var utilitiesCreeps = require('utilities.creeps');
var aishaConfig = require('aisha.config');
var aishaAppearance = require('aisha.appearance');

module.exports = {
  run: function(spawn) {
      if (spawn.spawning) {
        this.displaySpawnStatus(spawn);
      } else {
        this.maintainTargetPopulation(spawn);
      }
  },

  displaySpawnStatus: function(spawn) {
    var whatAreWeSpawning = "nothing";
    if (spawn.spawning) {
      whatAreWeSpawning = spawn.spawning.name;
    }
    spawn.room.visual.text(
      'spawning ' + whatAreWeSpawning,
      spawn.pos.x + 1,
      spawn.pos.y,
      aishaAppearance.styles.spawnStatus
    );
  },

  maintainTargetPopulation: function(spawn) {
    for (let role in aishaConfig.targetNumberOfRoles) {
      var targetNumberForGivenRole = aishaConfig.targetNumberOfRoles[role];
      console.log(`${role}: ${utilitiesCreeps.countCreepsWithRole(role)} / ${targetNumberForGivenRole}`);
      if (utilitiesCreeps.countCreepsWithRole(role) < targetNumberForGivenRole) {
        this.spawnWithRole(spawn, role);
        break;
      }
    }
  },

  spawnWithRole: function(spawn, role) {
    if (spawn.spawning) return ERR_BUSY;
    if (Memory.creepSerialNumber === undefined) Memory.creepSerialNumber = 0;

    let newName = `${role}_${Memory.creepSerialNumber}`;
    let chosenBodyType = aishaConfig.creepTypes.drone.body;

    console.log('Attempting to spawn new actor: ' + newName);
    let result = spawn.spawnCreep(
      chosenBodyType,
      newName,
      {memory: {role: role}}
    );

    if (result == OK) {
      Memory.creepSerialNumber += 1;
      console.log(`Success.`);
      return OK;
    } else {
      switch (result) {
        case ERR_NOT_ENOUGH_ENERGY:
          console.log(`Not enough energy (${spawn.room.energyAvailable})`);
          break;
        default:
          console.log(`Failed with error code: ${result}`);
      }
    }
  }
};
