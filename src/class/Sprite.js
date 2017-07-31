import Vector from './Vector';
export default class Sprite {
    constructor(url, urlImage) {
        this.ext = url.substr(url.lastIndexOf('.') + 1);
        this.content = {};
        this.animations = {
            "default": {
                frames: [0],
                speed: 1,
                loop: false
            }
        };
        this.playing = "default";
        this.countFrames = 0;
        this.position = new Point();
        this.current = 0;
        this.iteration = 0;
        this.inverse = false;
        this.velocity = new Vector();
        if (this.ext == 'json') {
            this.loadJson(url, urlImage);
        } else if (url) {
            this.addFrame(url, 0);
        }
        this.maxWidth = 0;
        this.maxHeight = 0;
        this.minOffsetX = null;
        this.minOffsetY = null;
    }
    playAnimation(name, speed, loop) {
        this.iteration = 0;
        this.playing = name;
        this.animations[name].speed = speed || 5;
        this.animations[name].loop = loop || false;
    }
    addAnimation(name, frames) {
        this.animations[name] = {
            speed: 5,
            frames: frames,
            loop: true
        }
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
            }else{
                ctx.drawImage(
                    this.content[this.current].img,
                    this.position.x,
                    this.position.y
                );
            }

            ctx.restore();
        }
        this.countFrames++;
        this.position.add(this.velocity);
    }
    loadJson(url, urlImage) {
        fetch(url)
            .then(function (res) {
                return res.json();
            })
            .then(function (json) {
                let frames = json.frames;
                for (let i in frames) {
                    this.addFrame(
                        urlImage,
                        Object.keys(this.content).length,
                        frames[i].frame.x,
                        frames[i].frame.y,
                        frames[i].frame.w,
                        frames[i].frame.h,
                        frames[i].spriteSourceSize.x,
                        frames[i].spriteSourceSize.y
                    )
                }
            }.bind(this));
    }
    addFrame(url, position, srcX, srcY, srcWidth, srcHeight, offsetX, offsetY) {
        if (this.maxWidth < srcWidth) {
            this.maxWidth = srcWidth;
        }
        if (this.maxHeight < srcHeight) {
            this.maxHeight = srcHeight;
        }
        if (this.minOffsetX == null || this.minOffsetX > offsetX) {
            this.minOffsetX = offsetX;
        }
        if (this.minOffsetY == null || this.minOffsetY > offsetY) {
            this.minOffsetY = offsetY;
        }
        let img = new Image();
        this.content[position] = {
            url: url,
            ready: false
        };
        img.onload = function () {
            this.content[position].img = img;
            this.content[position].width = srcWidth || img.width;
            this.content[position].height = srcHeight || img.height;
            this.content[position].x = srcX || 0;
            this.content[position].y = srcY || 0;
            this.content[position].offsetX = offsetX || 0;
            this.content[position].offsetY = offsetY || 0;
            this.content[position].ready = true;

        }.bind(this);
        img.src = url;
    }
}