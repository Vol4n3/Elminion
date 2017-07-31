import Sprite from './Sprite';
export default class Tile extends Sprite {
    constructor(url, urlImage) {
        super(url, urlImage)
    }
    /**
 * 
 * @param {CanvasRenderingContext2D} ctx 
 */
    draw(ctx) {
        if (this.animations[this.playing] && this.animations[this.playing].speed < this.countFrames) {

            this.current = this.animations[this.playing].frames[this.iteration];

            this.iteration++;
            if (this.iteration >= this.animations[this.playing].frames.length) {

                if (this.animations[this.playing].loop) {
                    this.iteration = 0;
                } else {
                    this.iteration = this.animations[this.playing].frames.length - 1;
                }
            }

            this.countFrames = 0;
        }
        if (this.content[this.current] && this.content[this.current].ready) {
            ctx.save();
            if (this.inverse) {
                ctx.translate(this.maxWidth / 2, 0);
                ctx.scale(-1, 1);
            }
            if (this.ext == 'json') {

                ctx.drawImage(
                    this.content[this.current].img,
                    this.content[this.current].x,
                    this.content[this.current].y,
                    this.content[this.current].width,
                    this.content[this.current].height,
                    this.position.x + this.content[this.current].offsetX - this.maxWidth / 2,
                    this.position.y + this.content[this.current].offsetY - (this.maxHeight + 22),
                    this.content[this.current].width,
                    this.content[this.current].height
                );
            } else {
             
                var pattern = ctx.createPattern(this.content[this.current].img, 'repeat');
                ctx.fillStyle = pattern;
                ctx.translate(this.position.x,this.position.y);
                ctx.fillRect(-this.position.x,-this.position.y,ctx.canvas.width,ctx.canvas.height);
                ctx.translate(-this.position.x, -this.position.y);

            }
            ctx.restore();
        }
        this.countFrames++;
        this.position.add(this.velocity);
    }
}