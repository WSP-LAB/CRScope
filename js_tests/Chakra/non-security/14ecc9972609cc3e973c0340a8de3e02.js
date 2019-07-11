class ExternInt16Array extends Int16Array {
	static get [Symbol.species]() {	return Map;};
};

var m1 = new Map();
var o1 = Object.getPrototypeOf(m1); 
Reflect.defineProperty(Map.prototype, "set", o1); 
var o2 = new ExternInt16Array(new ArrayBuffer(0x1000));
var m2 = new Map(o2); 
