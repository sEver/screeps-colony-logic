var aishaPerception = require("aisha.perception");

module.exports = {

  run: function(room) {
    if(Game.time % 60 == 0 && room.memory.traffic !== undefined && room.find(FIND_CONSTRUCTION_SITES).length == 0) {
      this.constructARoadInTheBusiestPlaceThatDoesntHaveOne(room);
    }
    if(Game.time % 100 == 0 && room.controller.level > 1) {
      // we can build 5 extensions
    }
    if(Game.time % 3600 == 0) {
      console.log("Resetting traffic memory.");
      room.memory.traffic = {};
    }
  },

  constructARoadInTheBusiestPlaceThatDoesntHaveOne: function(room) {
    const KEY = 0;
    const TRAFFIC = 1;

    let tilesSortedByTraffic =
      Object.entries(room.memory.traffic).
      sort((entryA, entryB) => entryB[1] - entryA[1]);

    if(tilesSortedByTraffic.length == 0) {
      return -1;
    } else {
      console.log(`Traffic data points: ${tilesSortedByTraffic.length}`);
    }

    while (
      aishaPerception.isStructurePresentAtPosition(
        room,
        ...this.coordsOfFirstTrafficTile(tilesSortedByTraffic),
        STRUCTURE_ROAD
      )
    ) {
      // There is already a road in this location.
      let roadTile = tilesSortedByTraffic[0];
      let roadTileKey = roadTile[KEY];
      delete room.memory.traffic[roadTileKey];
      tilesSortedByTraffic = tilesSortedByTraffic.slice(1);
    };

    let mostVisitedTile = tilesSortedByTraffic[0];
    let mostVisitedTileTraffic = mostVisitedTile[TRAFFIC];

    if(mostVisitedTileTraffic < 30) {
      console.log(`Heaviest offroad traffic is ${mostVisitedTileTraffic}, aborting.`);
      return;
    } else {
      var coords = this.coordsOfTrafficTile(mostVisitedTile);
      var status = room.createConstructionSite(coords[0], coords[1], STRUCTURE_ROAD);
    }

    console.log("numberOfTrafficTiles: ",tilesSortedByTraffic.length)
    console.log("mostVisitedTile: ",mostVisitedTile)
    console.log("mostVisitedTile coord: ", coords)
    console.log("mostVisitedTile traffic: ", mostVisitedTileTraffic)
    console.log("Status:", status);
  },

  getOffroadTrafficData: function(room) {

  },

  coordsOfFirstTrafficTile: function(tilesSortedByTraffic) {
    let mostVisitedTile = tilesSortedByTraffic[0];
    return this.coordsOfTrafficTile(mostVisitedTile);
  },

  coordsOfTrafficTile: function(trafficTile) {
    let trafficTileKey = trafficTile[0];
    let coords = trafficTileKey.split("_");
    coords[0] = Number(coords[0]);
    coords[1] = Number(coords[1]);
    return coords;
  }
}
