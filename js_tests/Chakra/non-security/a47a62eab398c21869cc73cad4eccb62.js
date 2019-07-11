let p = new Proxy({}, {});
let wm = new WeakMap();
wm.set(p, 2);
print(wm.get(p));
