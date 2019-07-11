function shouldBe(actual, expected) {

}

{
    let target = {};
    let handlers = {
        get: function(theTarget, propName, receiver) {

            shouldBe(receiver, 1);
            return 42;
        }
    };
    let proxy = new Proxy(target, handlers);
    shouldBe(Reflect.get(proxy, 0, 0x777777), 42);
}
