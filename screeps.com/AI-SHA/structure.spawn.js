var aishaConfig = require('aisha.config');
var aishaAppearance = require('aisha.appearance');
var utilitiesCreeps = require('utilities.creeps');

module.exports = {
  /* This is an object, should we really pass "spawn" to all the methods? */
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
      let targetNumberForGivenRole = aishaConfig.targetNumberOfRoles[role];
      let currentNumberForGivenRole = utilitiesCreeps.countCreepsWithRole(role);
      //console.log(`${role}: ${currentNumberForGivenRole} / ${targetNumberForGivenRole}`);
      if (currentNumberForGivenRole < targetNumberForGivenRole) {
        this.spawnWithRole(spawn, role);
        break;
      }
    }
  },

  spawnWithRole: function(spawn, role) {
    if (spawn.spawning) return ERR_BUSY;
    if (Memory.creepSerialNumber === undefined) Memory.creepSerialNumber = 0;

    let newName = `${role}_${Memory.creepSerialNumber}`;
    let chosenBodyType = aishaConfig.creepTypes.drone200.body;
    if(spawn.room.energyAvailable > 400) {
      chosenBodyType = aishaConfig.creepTypes.drone400.body;
      newName = `${aishaConfig.creepTypes.drone400.name}_${Memory.creepSerialNumber}`;
    }
    if(spawn.room.energyAvailable > 800) {
      chosenBodyType = aishaConfig.creepTypes.drone800.body;
      newName = `${aishaConfig.creepTypes.drone800.name}_${Memory.creepSerialNumber}`;
    }

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
