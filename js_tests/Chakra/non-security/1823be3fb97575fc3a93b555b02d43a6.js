class A{
constructor() {
}
}

class B extends A {
constructor() {
super();
}
}

var observer = new Proxy(A, {});
Reflect.construct(B, [], observer);


