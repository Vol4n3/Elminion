/// <reference path="../../node_modules/phaser-ce/typescript/phaser.d.ts" />
import Geometry from './Geometry';
import Point from './Point';
import Circle from './Circle';
import Mob from './Mob';
import Equipement from './Equipement';
import Hero from './Hero';
import Sprite from './Sprite';
import Tile from './Tile';
import Vector from './Vector';

window.Geometry = Geometry;
window.Point = Point;
window.Circle = Circle;
window.Mob = Mob;
window.Equipement = Equipement;
window.Hero = Hero;
window.Sprite = Sprite;
window.Tile = Tile;
window.Vector = Vector;

(function () {
    "use strict";
    class Game {
        constructor(elem) {
            this.canvas = document.createElement('canvas');
            this.container = document.getElementById(elem);
            this.container.appendChild(this.canvas);
            this.context = this.canvas.getContext('2d');
            window.addEventListener('resize', this.resize.bind(this));
            this.resize();
            this.sprites = {};
            requestAnimationFrame(this.gameloop.bind(this));
        }
        gameloop() {
            this.context.clearRect(0, 0, this.getWidth(), this.getHeight());
            for (let index in this.sprites) {
                this.sprites[index].draw(this.context);
            }
            requestAnimationFrame(this.gameloop.bind(this));
        }
        add(id, sprite) {
            this.sprites[id] = sprite;
        }
        getSprite(id){
            return this.sprites[id];
        }
        resize() {
            this.canvas.width = this.getWidth();
            this.canvas.height = this.getHeight();
        }
        getWidth() {
            return this.container.clientWidth;

        }
        getHeight() {
            return this.container.clientHeight;
        }
        getCenter() {
            return {
                x: this.getWidth() / 2,
                y: this.this.getHeight() / 2,
            }
        }
    }
    var game = new Game('game-canvas');
    
    for (var i = 11; i > 1; i--) {
        game.add('bg' + i, new Tile('../images/background/' + i + '.png'));
        game.getSprite('bg'+i).velocity.x = - 2 + i/15;
    }
    var player = new Hero(game);
    player.run_animation();
    
    game.add('bg1', new Tile('../images/background/1.png'));
    game.getSprite('bg1').velocity.x = -2;
    window.addEventListener('keydown', function (e) {

    });
    window.addEventListener('keyup', function (e) {

    });
    game.canvas.addEventListener('mousemove',function(e){
        var rect = game.canvas.getBoundingClientRect();
        player.sprite.position.x = e.clientX - rect.left;
        player.sprite.position.y = e.clientY - rect.top;
    })
    // setTimeout(function () {
    //     player.death_animation();
    //     player.look_right();
    // }, 5000)
})();