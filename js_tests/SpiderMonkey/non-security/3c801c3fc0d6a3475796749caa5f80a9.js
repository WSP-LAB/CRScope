function parseAsModule(source) {
    return Reflect.parse(source, {
        target: "module",
    });
}
parseAsModule('function f() {} //@ sourceMappingURL=http://example.com/foo.js.map', {});