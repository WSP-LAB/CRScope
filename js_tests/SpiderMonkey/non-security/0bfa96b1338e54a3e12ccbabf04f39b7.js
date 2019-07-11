var g = newGlobal();
var dbg = new Debugger(g);
function test(type, provocation) {
    dbg.onEnterFrame = function handleFirstFrame(f) {
        assertEq(f.eval(provocation), null);
    };
    assertEq(typeof g.eval('eval'), 'function');
}
g.eval("async function f() { await 3; }");
test('call', 'f();');