gczeal(13);
var g = newGlobal();
var dbg = Debugger(g);
dbg.onDebuggerStatement = function (frame) {
    var env = frame.environment.find("x");
};
g.eval("with (Object.create({})) { debugger; }");