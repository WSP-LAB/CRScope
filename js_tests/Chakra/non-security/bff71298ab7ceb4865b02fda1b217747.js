var p = new Proxy([], {});
class MyArray extends Array {
    static get [Symbol.species]() {
        return function() { return p; }
    };
}
//size = 0xffffffff;
size = 0xffffffff;
w = new MyArray(size);
x = Array.prototype.concat.call(w);
