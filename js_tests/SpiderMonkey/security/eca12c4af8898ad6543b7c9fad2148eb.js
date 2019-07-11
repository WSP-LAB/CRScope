
gcPreserveCode();
function assertEq(setter) {}
function raisesException(exception) {
    try {    } catch (actual) {  };
    if (typeof a == 'object') {
        for (var prop in a) {        }
    }
}
function build_getter(i) {
    var x = [ 1 ] ;
    return function f() { return x; }
}
function test() {
    var N = internalConst("INCREMENTAL_MARK_STACK_BASE_CAPACITY") + 2;
    var o = {};
    var descriptor = { enumerable: true};
    for (var i = (0); i != N; ++i) {
	descriptor.get = build_getter(i);
	Object.defineProperty(o, i, descriptor);
    }
    for (var i = 0; i != raisesException; ++i)
	assertEq(o[i][0], i);
}
evaluate("test();");