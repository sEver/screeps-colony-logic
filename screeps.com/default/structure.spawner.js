var utilitiesCreeps = require('utilities.creeps');

var TARGET_NUMBER_OF_CREEPS = [];
TARGET_NUMBER_OF_CREEPS['harvester'] = 0;
TARGET_NUMBER_OF_CREEPS['drone'] = 6;
TARGET_NUMBER_OF_CREEPS['builder'] = 0;
TARGET_NUMBER_OF_CREEPS['upgrader'] = 1;
TARGET_NUMBER_OF_CREEPS['excavator'] = 0;

var BODY_TYPE = [];
BODY_TYPE['ant'] = [WORK,CARRY,MOVE]; // cost: 200
BODY_TYPE['big_ant'] = [WORK,WORK,CARRY,CARRY,MOVE,MOVE]; // cost: 400
BODY_TYPE['very_big_ant'] = [WORK,WORK,WORK,CARRY,CARRY,CARRY,MOVE,MOVE,MOVE]; // cost: 600
BODY_TYPE['giant_ant'] = [WORK,WORK,WORK,WORK,CARRY,CARRY,CARRY,CARRY,MOVE,MOVE,MOVE,MOVE]; // cost: 800
BODY_TYPE['mega_ant'] = [
    WORK,WORK,WORK,WORK,WORK, 
    CARRY,CARRY,CARRY,CARRY,CARRY, 
    CARRY,CARRY,CARRY,CARRY,CARRY, 
    MOVE,MOVE,MOVE,MOVE,MOVE,
    MOVE,MOVE,MOVE,MOVE,MOVE
]; // cost: 1250
BODY_TYPE['worker'] = [WORK,WORK,WORK,WORK,WORK,MOVE];// cost: 550

var spawner = {
    run: function() {
        this.spawn = Game.spawns['Spawn1'];
        if (this.spawn.spawning) {
            var spawningCreep = Game.creeps[this.spawn.spawning.name];
            this.spawn.room.visual.text(
                'ð ï¸' + spawningCreep.memory.role,
                this.spawn.pos.x + 1, 
                this.spawn.pos.y, 
                {align: 'left', opacity: 0.8}
            );
        } else {
            this.maintainTargetPopulation();
        }

        this.spawn.room.visual.text(
            `Hive Vega`,
            1, 4, { align: 'left', color: '#FFFFFF' }
        );
        
        this.spawn.room.visual.text(
            `Energy available: ${this.spawn.room.energyAvailable} (${(100 * this.spawn.room.energyAvailable / this.spawn.room.energyCapacityAvailable).toFixed(0) }%)`,
            1, 1, { align: 'left', color: '#00FF00' }
        );
        this.spawn.room.visual.text(
            `Energy capacity: ${this.spawn.room.energyCapacityAvailable}`,
            1, 2, { align: 'left', color: '#DDDDDD' }
        );
        
        this.spawn.room.visual.text(
            `Energy in sources: ${this.spawn.room.find(FIND_SOURCES).reduce((acc,cur) => acc + cur.energy, 0)}`,
            1, 3, { align: 'left', color: '#FFFF00' }
        );
        
    },
    
    maintainTargetPopulation: function() {
        //console.log('MTP');
        for (var role in TARGET_NUMBER_OF_CREEPS) {
            var targetNumber = TARGET_NUMBER_OF_CREEPS[role];
            if (utilitiesCreeps.countCreepsWithRole(role) < TARGET_NUMBER_OF_CREEPS[role]) {
                // we need to spawn some creeps of this role
                this.spawnWithRole(role);
                // also we can break the for loop
                break;
            }
        }
    },
    
    spawnWithRole: function(role) {
        console.log('SWR');
        if (!this.spawn.spawning) {
            
            if (Memory.creepSerialNumber === undefined) {
                Memory.creepSerialNumber = 0;
            }
            
            let newName = `${role}_${Memory.creepSerialNumber}`;
            let chosenBodyType = BODY_TYPE['ant'];
            console.log('Spawning new Ant: ' + newName);
            
            if (this.spawn.room.energyAvailable > 1500) {
                chosenBodyType = BODY_TYPE['mega_ant'];
                newName = 'mega_' + newName;
            } else 
            if (this.spawn.room.energyAvailable > 800) {
                chosenBodyType = BODY_TYPE['giant_ant'];
                newName = 'giant_' + newName;
            } else 
            if (this.spawn.room.energyAvailable == 300) {
                chosenBodyType = BODY_TYPE['ant'];
            } else {
                chosenBodyType = BODY_TYPE['very_big_ant'];
                newName = 'very_big_' + newName;
            }

            let result = this.spawn.spawnCreep(
                chosenBodyType, 
                newName, 
                {memory: {role: role}}
            );
            if (result == OK) {
                Memory.creepSerialNumber += 1;
                console.log(`Success.`);
                return OK;
            } else {
                switch (result) {
                    case ERR_NOT_ENOUGH_ENERGY:
                        console.log(`Not enough energy (${this.spawn.room.energyAvailable})`);
                        break;
                    default:
                        console.log(`Failed with error code: ${result}`);
                    
                }
            }
        }
    }
}; 

module.exports = spawner;
