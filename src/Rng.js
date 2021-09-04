"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Rng = void 0;
class Rng {
    constructor(seed, shift) {
        this.seed = 0;
        this.shift = [0, 0, 0];
        this.seed = seed;
        this.shift = shift;
    }
    next() {
        let num = this.seed;
        num ^= (num >>> this.shift[0]) & 0xffffffff;
        num ^= (num << this.shift[1]) & 0xffffffff;
        num ^= (num >>> this.shift[2]) & 0xffffffff;
        this.seed = num >>> 0;
        return this.seed;
    }
    nextFloat() {
        const multi = Math.fround(2.3283061589829401E-10);
        return Math.fround(this.next() * multi);
    }
}
exports.Rng = Rng;
;
//# sourceMappingURL=Rng.js.map