module.exports = {
  creepTypes: {
    drone200: {
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
      ],
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
      actions: ["harvest", "build", "upgrade"],
    },
    repairer: {
      actions: ["harvest", "repair", "upgrade"],
    },
  },
  targetNumberOfRoles: {
    drone: 3,
    upgrader: 1,
    builder: 2,
    repairer: 5,
  },
  minimumStructureHp: 10000,
  comfortableStructureHp: 50 * 1000 * 1000,
}
