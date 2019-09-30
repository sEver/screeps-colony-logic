module.exports = {
  creepTypes: {
    drone: {
      name: "drone",
      body: [WORK,CARRY,MOVE],
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
    drone: 5,
    upgrader: 1,
    builder: 2,
  },
  minimumStructureHp: 2000,
}
