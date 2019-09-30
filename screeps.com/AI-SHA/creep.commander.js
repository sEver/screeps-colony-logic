var creepActions = require('creep.actions');

module.exports = {

  run: function(creep) {
    this.determineMission(creep);
    this.executeChosenMission(creep);
  },

  determineMission: function(creep) {
    if (!creep.memory.mission || creep.memory.mission != 'harvest' && creep.carry.energy == 0) {
      creep.memory.mission = 'harvest';
    }
    if (creep.memory.mission != 'store' && creep.carry.energy == creep.carryCapacity) {
      creep.memory.mission = 'store';
    }
    creep.say(creep.memory.mission);
  },

  executeChosenMission: function(creep) {
    if (creep.memory.mission == 'store') {
      creep.say('DS');
      creepActions.store(creep);// if there is nowhere to deliver the energy, this just stops
    } else {
      creep.say('DH');
      creepActions.harvest(creep);
    }
  }
}
