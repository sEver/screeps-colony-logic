module.exports = {
  run: function(room) {
    //console.log("Running construction");
    if(Game.time % 60 == 0 && room.memory.traffic !== undefined && room.find(FIND_CONSTRUCTION_SITES).length == 0) {
      this.constructARoadInTheBusiestPlace(room);
    }
    if(Game.time % 1 == 0 && room.controller.level > 1) {
      // we can build 5 extensions
    }
  },
  constructARoadInTheBusiestPlace: function(room) {
    let sortedEntries = Object.entries(room.memory.traffic).sort((entryA, entryB) => entryB[1] - entryA[1]);
    if(!sortedEntries.length) return -1;

    let mostVisitedTile = sortedEntries[0];
    let mostVisitedTileKey = mostVisitedTile[0];
    let mostVisitedTileTraffic = mostVisitedTile[1];
    let coords = mostVisitedTileKey.split("_");
    if(mostVisitedTileTraffic < 30) return;
    if(mostVisitedTileTraffic === 0) {
      room.memory.traffic = {};
    } else {
      var status = room.createConstructionSite(Number(coords[0]), Number(coords[1]), STRUCTURE_ROAD);
      room.memory.traffic[mostVisitedTileKey] = 0;
    }
    console.log(sortedEntries);
    console.log("mostVisitedTile: ",mostVisitedTile)
    console.log("mostVisitedTile coord: ", coords)
    console.log("mostVisitedTile traffic: ", mostVisitedTileTraffic)
    console.log("Status:", status);
  }
}
