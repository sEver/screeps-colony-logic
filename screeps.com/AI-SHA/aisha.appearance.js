module.exports = {
  styles: {
    spawnStatus: {
      align: 'left',
      opacity: 1,
      color: '#ccc',
      backgroundColor: 'rgba(10,10,10,0.8)'
    }
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
      `Hive`,
      anchor.x, anchor.y+3, { align: 'left', color: '#FFFFFF' }
    );

  },
}
