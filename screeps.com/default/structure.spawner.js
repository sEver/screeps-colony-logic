var utilitiesCreeps = require('utilities.creeps');

const TARGET_NUMBER_OF_CREEPS = [];
TARGET_NUMBER_OF_CREEPS['harvester'] = 0;
TARGET_NUMBER_OF_CREEPS['drone'] = 6;
TARGET_NUMBER_OF_CREEPS['builder'] = 2;
TARGET_NUMBER_OF_CREEPS['upgrader'] = 1;
TARGET_NUMBER_OF_CREEPS['excavator'] = 0;

const BODY_TYPE = [];
BODY_TYPE['antX1'] = [WORK,CARRY,MOVE]; // cost: 200
BODY_TYPE['antX2'] = [
  WORK,WORK,
  CARRY,CARRY,
  MOVE,MOVE
]; // cost: 400
BODY_TYPE['antX3'] = [
  WORK,WORK,WORK,
  CARRY,CARRY,CARRY,
  MOVE,MOVE,MOVE
]; // cost: 600
BODY_TYPE['antX4'] = [
  WORK,WORK,WORK,WORK,
  CARRY,CARRY,CARRY,CARRY,
  MOVE,MOVE,MOVE,MOVE
]; // cost: 800
BODY_TYPE['antX5'] = [
  CARRY,CARRY,CARRY,CARRY,CARRY,
  CARRY,CARRY,CARRY,CARRY,CARRY,
  MOVE,MOVE,MOVE,MOVE,MOVE,
  MOVE,MOVE,MOVE,MOVE,MOVE,
  WORK,WORK,WORK,WORK,WORK
]; // cost: 1250
BODY_TYPE['worker'] = [WORK,WORK,WORK,WORK,WORK,MOVE];// cost: 550

var spawner = {
  run: function(spawn) {
      this.spawn = spawn;

      if (this.spawn.spawning) {
        this.displaySpawnerStatus();
      } else {
        this.maintainTargetPopulation();
      }
      this.displayDiagnostics();
  },

  displayDiagnostics: function() {
    let anchor = {x: 10, y: 18};

    this.spawn.room.visual.text(
      `Energy available: ${this.spawn.room.energyAvailable} (${(100 * this.spawn.room.energyAvailable / this.spawn.room.energyCapacityAvailable).toFixed(0) }%)`,
      anchor.x, anchor.y, { align: 'left', color: '#00FF00' }
    );
    this.spawn.room.visual.text(
      `Energy capacity: ${this.spawn.room.energyCapacityAvailable}`,
      anchor.x, anchor.y+1, { align: 'left', color: '#DDDDDD' }
    );

    this.spawn.room.visual.text(
      `Energy in sources: ${this.spawn.room.find(FIND_SOURCES).reduce((acc,cur) => acc + cur.energy, 0)}`,
      anchor.x, anchor.y+2, { align: 'left', color: '#FFFF00' }
    );
    this.spawn.room.visual.text(
      `Hive Vega STABLE 1`,
      anchor.x, anchor.y+3, { align: 'left', color: '#FFFFFF' }
    );

  },

  displaySpawnerStatus: function() {
    var spawningCreep = Game.creeps[this.spawn.spawning.name];
    this.spawn.room.visual.text(
      'spawning ' + spawningCreep.memory.role,
      this.spawn.pos.x + 1,
      this.spawn.pos.y,
      {align: 'left', opacity: 1, color: '#ccc', backgroundColor: 'rgba(10,10,10,0.8)'}
    );
  },

  maintainTargetPopulation: function() {
    //console.log('MTP');
    for (var role in TARGET_NUMBER_OF_CREEPS) {
      var targetNumber = TARGET_NUMBER_OF_CREEPS[role];
      if (utilitiesCreeps.countCreepsWithRole(role) < TARGET_NUMBER_OF_CREEPS[role]) {
        // we need to spawn some creeps of this role
        this.spawnWithRole(role);
        // also we can break the for loop
        break;
      }
    }
  },

  spawnWithRole: function(role) {
    console.log('SWR');

    if (this.spawn.spawning) return ERR_BUSY;

    if (Memory.creepSerialNumber === undefined) {
      Memory.creepSerialNumber = 0;
    }


    let newName = `${role}_${Memory.creepSerialNumber}`;
    let chosenBodyType = BODY_TYPE['antX1'];

    if (this.spawn.room.energyAvailable > 800) {
      chosenBodyType = BODY_TYPE['antX4'];
      newName = 'quad_' + newName;
    } else if (this.spawn.room.energyAvailable > 600) {
      chosenBodyType = BODY_TYPE['antX3'];
      newName = 'tri_' + newName;
    }


    console.log('Trying to spawn new Ant: ' + newName);
    let result = this.spawn.spawnCreep(
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
          console.log(`Not enough energy (${this.spawn.room.energyAvailable})`);
          break;
        default:
          console.log(`Failed with error code: ${result}`);
      }
    }
  }
};

module.exports = spawner;
