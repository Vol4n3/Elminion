import Mob from './Mob';
export default class Equipement {
    constructor() {
        this.classType='Equipement';
        this.durability = 100;
        this.maxDurability= 100;
        this.description = 'Casque de zeus';
        this.emplacement = 'head';
        this.rarety = 'epic';
        this.level = '';
        this.vitality = 0;
        this.strength = 0;
        this.intel = 0;
        this.wisdom = 0;
        this.agility = 0;
        this.resistances = {
            earth: 0,
            fire: 0,
            nature: 0,
            wind: 0,
            water: 0,
            lightning: 0,
            arcane: 0
        };
        this.damageBonus = {
            earth: 0,
            fire: 0,
            nature: 0,
            wind: 0,
            water: 0,
            lightning: 0,
            arcane: 0
        };
    }
    /**
     * 
     * @param {Mob} mob 
     */
    applyEffects(mob) {
        for (let stat in this) {
            switch (stat) {
                case 'vitality':
                case 'strength':
                case 'intel':
                case 'wisdom':
                case 'agility':

                    mob[stat] += this[stat];
                    break;

                default:
                    break;
            }
        }
        for (var res in this.resistances) {
            mob.resistances[res] += this.resistances[res];
        }
        for (var bonus in this.damageBonus) {
            mob.damageBonus[bonus] += this.damageBonus[bonus];
        }
    }
}