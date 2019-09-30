var creepActions = require('creep.actions');

module.exports = {

  run: function(creep) {
    this.determineMission(creep);
    this.executeChosenMission(creep);
  },

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
          creep.memory.mission = 'deliver';
        };
        break;
      default:
    }
  }
}
