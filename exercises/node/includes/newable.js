function Newable() {
    this.params = arguments;
}

Newable.prototype.listParams = function() {
    for (let p = 0; p < this.params.length; p++) {
        const param = this.params[p];
        console.log(`param ${p} is ${param}`);
    }
}

module.exports = Newable;