var a1 = Array.prototype.constructor.apply(null, new Proxy([1950, 1960, 1970, 1980, 1990, 2000, 2010], {})); 
var a2 = new Proxy(new Proxy(new Array(66), {}), {});
var o2 = String.prototype.blink.bind(Object, a1);
Object.setPrototypeOf(a2, o2);
