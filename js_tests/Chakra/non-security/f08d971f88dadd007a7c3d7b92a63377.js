var proxy = new Proxy(function(){}, {});
class C extends proxy {
    constructor() {
        super(Object.setPrototypeOf(C, function(){}))
    }
}
Reflect.construct(C, [], proxy);
