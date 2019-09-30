var colors = {
  stealthJetGray: 'rgba(10,10,10,0.8)',
  lightGray: '#ccc',
  white: '#fff',
  energy: '#f4e068',
};
module.exports = {
  colors: colors,
  styles: {
    spawnStatus: {
      align: 'left',
      opacity: 1,
      backgroundColor: colors.stealthJetGray
    }
  },
  displayRoomDiagnostics: function(room) {
    let anchor = {x: 10, y: 18};
    room.visual.text(
      `Energy available: ${room.energyAvailable} (${(100 * room.energyAvailable / room.energyCapacityAvailable).toFixed(0) }%)`,
      anchor.x, anchor.y, { align: 'left', color: '#00FF00' }
    );
    room.visual.text(
      `Energy capacity: ${room.energyCapacityAvailable}`,
      anchor.x, anchor.y+1, { align: 'left', color: colors.lightGray }
    );
    room.visual.text(
      `Energy in sources: ${room.memory.energyInAllSources}`,
      anchor.x, anchor.y+2, { align: 'left', color: colors.energy }
    );
    room.visual.text(
      `AI-SHA`,
      anchor.x, anchor.y+3, { align: 'left', color: colors.white }
    );
  },
}
