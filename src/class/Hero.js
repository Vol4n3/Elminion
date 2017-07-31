import Mob from './Mob';
import Sprite from './Sprite';

export default class Hero extends Mob {
    constructor(game) {
        super();
        this.sprite = new Sprite('../sprites/hero/hero.json', '../sprites/hero/hero.png');
        this.sprite.addAnimation('death', [0, 1, 2, 3, 4, 5, 6, 7]);
        this.sprite.addAnimation('idle', [8, 9, 10, 11, 12, 13]);
        this.sprite.addAnimation('jump', [14, 15, 16, 17, 18, 19]);
        this.sprite.addAnimation('run', [20, 21, 22, 23, 24, 25, 26, 27]);
        this.sprite.addAnimation('slash', [28, 29, 30, 31, 32, 33]);
        this.sprite.position.y = 745;
        game.add('hero', this.sprite);
    }
    idle_animation() {
        this.sprite.playAnimation('idle', 5, true);
    }
    death_animation() {
        this.sprite.playAnimation('death', 5, false);
    }
    jump_animation() {
        this.sprite.playAnimation('jump', 5, false);
    }
    slash_animation() {
        this.sprite.playAnimation('slash', 5, false);
    }
    run_animation() {
        this.sprite.playAnimation('run', 3, true);
    }
    look_left() {
        this.sprite.inverse = true;
    }
    look_right() {
        this.sprite.inverse = false;
    }
}