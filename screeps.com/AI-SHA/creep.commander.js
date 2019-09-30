var creepActions = require('creep.actions');

module.exports = {
  run: function(creep) {
    let role = creep.memory.role;
    if(role !== undefined && this[role] !== undefined) {
      this[role].determineMission(creep);
      this[role].executeChosenMission(creep);
    }
  },
  drone: {
    determineMission: function(creep) {
      if (_.sum(creep.carry) == 0) {
        creep.memory.mission = 'harvest';
      }
      if (
        _.sum(creep.carry) == creep.carryCapacity &&
        creep.memory.mission != 'build' &&
        creep.memory.mission != 'upgrade'
      ) {
        creep.memory.mission = 'store';
      }
    },

    executeChosenMission: function(creep) {
      switch (creep.memory.mission) {
        case 'store':
          if (creepActions.store(creep) != OK) {
            creep.memory.mission = 'build';
          }
          break;
        case 'build':
          if (creepActions.build(creep) != OK) {
            creep.memory.mission = 'upgrade';
          }
          break;
        case 'upgrade':
          creepActions.upgrade(creep);
          break;
        case 'harvest':
          if (creepActions.harvest(creep) != OK) {
            creep.memory.mission = 'store';
          };
          break;
        default:
      }
    }
  },
  builder: {
    determineMission: function(creep) {
      if (!creep.memory.mission) {
        creep.memory.mission = "build";
      }
      if (creep.memory.mission != "harvest" && creep.carry.energy == 0) {
        creep.memory.mission = "harvest"
        creep.say(creep.memory.mission);
      }
      if (creep.memory.mission != "build" && creep.carry.energy == creep.carryCapacity) {
        creep.memory.mission = "build"
        creep.say(creep.memory.mission);
      }
    },
    executeChosenMission: function(creep) {
      if (creep.memory.mission == "build") {
        if(creepActions.build(creep)!=OK){
          creepActions.upgrade(creep);
        };
      } else {
        creepActions.harvest(creep);
      }
    },
  },
  upgrader: {
    determineMission: function(creep) {
      if (!creep.memory.mission) {
        creep.memory.mission = "harvest";
      }
      // if upgrading and empty - switch to harvesting
      if (creep.memory.mission != "harvest" && creep.carry.energy == 0) {
        creep.memory.mission = "harvest";
        creep.say(creep.memory.mission);
      }
      // if not upgrading and full - switch to upgrading
      if (creep.memory.mission != "upgrade" && creep.carry.energy == creep.carryCapacity) {
        creep.memory.mission = "upgrade";
        creep.say(creep.memory.mission);
      }
    },
    executeChosenMission: function(creep) {
      if (creep.memory.mission == "upgrade") {
        creepActions.upgrade(creep);// you can always deliver energy to controller, so this never stops
      } else {
        creepActions.harvest(creep);
      }
    },
  },
}
