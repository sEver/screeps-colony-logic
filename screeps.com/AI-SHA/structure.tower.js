var aishaConfig = require('aisha.config');
var aishaPerception = require('aisha.perception');

module.exports = {
  run: function(room) {
    this.towers = room.find(
      FIND_MY_STRUCTURES,
      {filter: { structureType: STRUCTURE_TOWER }}
    );
    if(this.towers.length) {
      this.defendRoom(room);
      this.maintainRoom(room);
      this.drawRangeCircles(room);
    } else {
      //console.log(`No towers in room: ${room.name}`)
    }
  },

  maintainRoom: function(room) {
    var structuresCritical = aishaPerception.structuresRequiringUrgentRepair(room);

    if(structuresCritical.length) {
      structuresCritical.sort((a,b) => a.hits - b.hits);
      this.towers.forEach(tower => tower.repair(structuresCritical[0]));
    }
  },

  defendRoom: function(room) {
    var hostiles = room.find(FIND_HOSTILE_CREEPS);
    if (hostiles.length) {
      var username = hostiles[0].owner.username;

      if(username !== 'Invader') {
        Game.notify(`User ${username} spotted in room ${roomName}`);
      }

      this.towers.forEach(tower => tower.attack(hostiles[0]));
    }
  },

  drawRangeCircles: function(room) {
    this.towers.forEach(tower => {
      room.visual.circle(
        tower.pos,
        {
          radius: 5,
          fill: '#00FF00',
          opacity: 0.02
        }
      );
      room.visual.circle(
        tower.pos,
        {
          radius: 20,
          fill: '#00FF00',
          opacity: 0.02
        }
      );
    });
  }
};
