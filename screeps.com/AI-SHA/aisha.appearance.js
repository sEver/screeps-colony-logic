var colors = {
  stealthJetGray: 'rgba(10,10,10,0.8)',
  lightGray: '#ccc',
  white: '#fff',
  green: '#0f0',
  energy: '#f4e068',
  blue: '#00A',
};
module.exports = {
  colors: colors,
  styles: {
    spawnStatus: {
      align: 'left',
      opacity: 1,
      backgroundColor: colors.stealthJetGray,
    },
    paths: {
      harvest: {
        opacity: 1,
        strokeWidth: .04,
        lineStyle: 'solid',
        stroke: colors.energy,
      },
      store: {
        opacity: 1,
        strokeWidth: .04,
        lineStyle: 'solid',
        stroke: colors.lightGray,
      },
      upgrade: {
        opacity: 1,
        strokeWidth: .04,
        lineStyle: 'dashed',
        stroke: colors.white,
      },
      build: {
        opacity: 1,
        strokeWidth: .04,
        lineStyle: 'dotted',
        stroke: colors.green,
      },
      repair: {
        opacity: 1,
        strokeWidth: .04,
        lineStyle: 'dotted',
        stroke: colors.blue,
      },
    },
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
      `Energy in sources: ${room.memory.energyInAllSources}  (${(100 * room.memory.energyInAllSources / (2*3000)).toFixed(0) }%)`,
      anchor.x, anchor.y+2, { align: 'left', color: colors.energy }
    );
    room.visual.text(
      `AI-SHA`,
      anchor.x, anchor.y+3, { align: 'left', color: colors.white }
    );
  },
}
