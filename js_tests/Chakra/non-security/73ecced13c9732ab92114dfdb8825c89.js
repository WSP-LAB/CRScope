class B {
    set x(v) { print("B.prototype.set x"); this._x = v; }
    get x() { print("B.prototype.get x"); return this._x; }
}

class A extends B {
    set x(v) { print("A.prototype.set x"); super.x = v + 100; }
    get x() { print("A.prototype.get x"); return super.x; }
}

var a = new A();
a.x = 100;
print(a.x);

var a1 = new A();
a1.x = 100;
print(a1.x);

