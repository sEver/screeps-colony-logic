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
    droneWCM500: {
      name: "quad_drone",
      body: [
        WORK,WORK,WORK,WORK,WORK,
        CARRY,CARRY,CARRY,CARRY,CARRY,
        MOVE,MOVE,MOVE,MOVE,MOVE
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
    drone: 8,
    upgrader: 0,
    builder: 0,
    repairer: 1,
  },
  minimumStructureHp: 10000,
  comfortableStructureHp: 1000 * 1000,
  roomSign: "Through the destruction of our enemies, do we earn our salvation?",
}
