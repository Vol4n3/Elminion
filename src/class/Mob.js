import Equipement from './Equipement';
export default class Mob {
    constructor() {
        this.classType = "Mob";
        this.life = 20;
        this.lifeMax = 20;
        this.xp = 0;
        this.level = 1;
        this.levelMax = 100;
        this.resource = 20;
        this.resourceMax = 20;
        this.attributPoint = 0;
        this.vitalityBase = 0;
        this.vitality = 0;
        this.strengthBase = 0;
        this.strength = 0;
        this.intelBase = 0;
        this.intel = 0;
        this.wisdomBase = 0;
        this.wisdom = 0;
        this.agilityBase = 0;
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
        this.equipements = {
            head: null,
            chest: null,
            belt: null,
            legs: null,
            foot: null,
            main_hand: null,
            second_hand: null,
            ring: null,
            neck: null,
            back: null,
        }
    }
    
    update() {
        this.vitality = this.vitalityBase;
        this.strength = this.strengthBase;
        this.intel = this.intelBase;
        this.wisdom = this.wisdomBase;
        this.agility = this.agilityBase;
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
        for (let e in this.equipements) {
            this.equipements[e].applyEffects(this);
        }
    }
    /**
     * 
     * @param {Mob} mob 
     * @param {string} element 
     */
    avoid() {
        let score = this.agility > 120 ? 60 : this.agility * 0.5;
        return score > Math.random() * 100;
    }
    getMinDamage(element) {
        let dmg;
        switch (element) {
            case earth:
                dmg = this.strength;
                break;
            case nature:
                dmg = 0;
                break;
            case wind:
                dmg = 0;
                break;
            case water:
                dmg = this.agility;
                break;
            case lightning:
                dmg = 0;
                break;
            case fire:
                dmg = this.intel;
                break;
            case arcane:
                dmg = this.wisdom * 0.5;
                break;
            default:
                dmg = 1;
                break;
        }
        return dmg *= Math.round(this.damageBonus[element] / 100);
    }
    getMaxDamage(element) {
        let dmg;
        switch (element) {
            case earth:
                dmg = (this.strength + this.level) + this.strength;
                break;
            case nature:
                dmg = (this.strength * 2 + this.level);
                break;
            case wind:
                dmg = (this.agility * 2 + this.level);
                break;
            case water:
                dmg = (this.strength + this.level) + this.agility;
                break;
            case lightning:
                dmg = (this.intel * 2 + this.level);
                break;
            case fire:
                dmg = (this.intel + this.level) + this.intel;
                break;
            case arcane:
                dmg = (this.intel + this.level) + this.wisdom * 0.5;
                break;
            default:
                dmg = 1;
                break;
        }
        return dmg *= Math.round(this.damageBonus[element] / 100);
    }
    /**
     * 
     * @param {Mob} mob 
     * @param {string} element 
     */
    inflict(mob, element) {
        let dmg;
        switch (element) {
            case earth:
                dmg = Math.random() * (this.strength + this.level) + this.strength;
                break;
            case nature:
                dmg = Math.random() * (this.strength * 2 + this.level);
                break;
            case wind:
                dmg = Math.random() * (this.agility * 2 + this.level);
                break;
            case water:
                dmg = Math.random() * (this.strength + this.level) + this.strength;
                break;
            case lightning:
                dmg = Math.random() * (this.intel * 2 + this.level);
                break;
            case fire:
                dmg = Math.random() * (this.intel + this.level) + this.intel;
                break;
            case arcane:
                dmg = Math.random() * (this.intel + this.level) + this.wisdom * 0.5;
                break;
            default:
                dmg = 1;
                break;
        }
        dmg *= this.damageBonus[element] / 100;
        mob.take(Math.round(dmg), element);
    }
    take(dmg, element) {
        let absorbtion = this.resistances[element] / 100;
        //Une ataque arcane ne peut etre évité
        if (element == 'arcane' || !this.avoid()) {
            this.life -= dmg * absorbtion;
            this.isAlive();
        } else {
            //avoid ataque
        }
    }
    isAlive() {
        if (this.life > 0) {
            return true;
        } else {
            this.respawn();
            return false;
        }
    }
    respawn() {
        this.life = this.lifeMax;
    }
    isLeveling() {
        if (this.xp >= this.level * 100) {
            this.levelUp(1);
        }
    }
    levelUp(amount) {
        if (this.level < this.levelMax) {
            this.attributPoint++;
            this.xp -= this.level * 100;
            this.xp = this.xp < 0 ? 0 : this.xp;
            this.level += amount;
            this.isLeveling();
        }
    }
    /**
     * 
     * @param {string} slot 
     * @param {Equipement} equipement 
     */
    setEquipement(slot,equipement){
        if(equipement.classType == 'equipement'){
            this.equipements['slot'] = equipement;
        }
    }
    clearSlot(slot){
        this.equipements['slot'] = null;
    }
};
