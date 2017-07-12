import Geometry from './Geometry';
export default class Point extends Geometry {
    constructor(x, y) {
        super();
        this.x = x || 0;
        this.y = y || 0;
        this.classType = "Point";
        this.lastPosition = {
            x: 0,
            y: 0
        }
    }
    getObject() {
        return {
            x: this.x,
            y: this.y
        }
    }
    setLastPosition() {
        this.lastPosition = this.getObject;
    }
    translate(x, y) {
        this.setLastPosition();
        this.x += x;
        this.y += y;
    }
    add(p) {
        this.setLastPosition();
        this.translate(p.x, p.y);
    }
    soustract(p) {
        this.setLastPosition();
        this.translate(- p.x, - p.y);
    }
    divide(p) {
        this.setLastPosition();
        this.x /= p.x;
        this.y /= p.y;
    }
    multiply(p) {
        this.setLastPosition();
        this.x *= p.x;
        this.y *= p.y;
    }
    angleTo(p) {
        return Math.atan2(p.y - this.y, p.x - this.x);
    }
    distanceTo(p) {
        var dx = p.x - this.x,
            dy = p.y - this.y;
        return Math.sqrt(dx * dx + dy * dy);
    }
    signTo(p1, p2) {
        return (this.x - p2.x) * (p1.y - p2.y) - (p1.x - p2.x) * (this.y - p2.y);
    }
    inTriangle(p1, p2, p3, strict) {
        let b1, b2, b3;
        if (strict) {
            b1 = this.signTo(p1, p2) < 0;
            b2 = this.signTo(p2, p3) < 0;
            b3 = this.signTo(p3, p1) < 0;
        } else {
            b1 = this.signTo(p1, p2) <= 0;
            b2 = this.signTo(p2, p3) <= 0;
            b3 = this.signTo(p3, p1) <= 0;
        }
        return ((b1 == b2) && (b2 == b3));
    }
}
