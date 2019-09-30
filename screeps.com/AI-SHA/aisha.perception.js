var aishaAppearance = require('aisha.appearance');

module.exports = {
  scanRoom: function(room) {
    if(!room.memory.sources) room.memory.sources = {};
    var sources = room.find(FIND_SOURCES);
    sources.forEach((source) => {
      if (true || !(source.id in room.memory.sources)) {
        console.log(`ADDING ${source.id}`)
        room.memory.sources[source.id] = {pos: JSON.parse(JSON.stringify(source.pos))};
        console.log(Object.entries(room.memory.sources[source.id]))
      }
      // source.pos,
      // energy,
      // energyCapacity
      // id, //Game.getObjectById
      // ticksToRegeneration,

      room.visual.text(
        `${source.energy}`,
        source.pos.x, source.pos.y-1, { color: aishaAppearance.colors.energy }
      );
      if(source.ticksToRegeneration) {
        room.visual.text(
          `${source.ticksToRegeneration}`,
          source.pos.x, source.pos.y+1, { color: '#aaa', backgroundColor: '#222', opacity: 0.6 } //// FIXME: Move this to styles
        );
      }
    });

    room.memory.energyInAllSources = sources.reduce((acc, cur) => acc + cur.energy, 0);
  }
}
