module.exports = {
  creepTypes: {
    drone: {
      name: "drone",
      body: [WORK,CARRY,MOVE],
    },
    drone400: {
      name: "double_drone",
      body: [
        WORK,WORK,
        CARRY,CARRY,
        MOVE,MOVE
      ],
    },
    drone800: {
      name: "quad_drone",
      body: [
        WORK,WORK,WORK,WORK,
        CARRY,CARRY,CARRY,CARRY,
        MOVE,MOVE,MOVE,MOVE
      ], // cost: 800
    },
  },
  creepRoles: {
    harvester: {
      actions: ["harvest", "store", "upgrade"],
    },
    upgrader: {
      actions: ["harvest", "upgrade"],
    },
    builder: {
      actions: ["retrieve", "build"],
    }
  },
  targetNumberOfRoles: {
    drone: 7,
    upgrader: 1,
    builder: 2,
  },
  minimumStructureHp: 2000,
}
