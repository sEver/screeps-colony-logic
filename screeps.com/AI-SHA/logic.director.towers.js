var aishaConfig = require('aisha.config');

module.exports = {
  run: function() {
    var roomName = Game.spawns['Spawn1'].room.name;
    this.towers = Game.rooms[roomName].find(
      FIND_MY_STRUCTURES,
      {filter: { structureType: STRUCTURE_TOWER }}
    );
    if(this.towers.length) {
      this.defendRoom(roomName);
      this.maintainRoom(roomName);
      this.drawRangeCircles(roomName);
    }
  },

  maintainRoom: function(roomName) {
    var damagedBuildings = Game.rooms[roomName].find(FIND_STRUCTURES, {
      filter: structure => {
        var result =
        (
          structure.structureType == STRUCTURE_ROAD ||
          structure.structureType == STRUCTURE_RAMPART ||
          structure.structureType == STRUCTURE_CONTAINER ||
          structure.structureType == STRUCTURE_WALL
        ) &&
        structure.hits < structure.hitsMax * 0.8 &&
        structure.hits < aishaConfig.minimumStructureHp
        return result;
      }
    });
    if(damagedBuildings.length) {
      damagedBuildings.sort((a,b) => a.hits - b.hits);
      this.towers.forEach(tower => tower.repair(damagedBuildings[0]));
    }
  },

  defendRoom: function(roomName) {
    var hostiles = Game.rooms[roomName].find(FIND_HOSTILE_CREEPS);
    if (hostiles.length) {
      var username = hostiles[0].owner.username;

      if(username !== 'Invader') {
        Game.notify(`User ${username} spotted in room ${roomName}`);
      }

      this.towers.forEach(tower => tower.attack(hostiles[0]));
    }
  },

  drawRangeCircles: function(roomName) {
    this.towers.forEach(tower => {
      Game.rooms[roomName].visual.circle(
        tower.pos,
        {
          radius: 5,
          fill: '#00FF00',
          opacity: 0.02
        }
      );
      Game.rooms[roomName].visual.circle(
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
