lfcode = Array(`
Function.prototype.toString = function() this(new Proxy([], {get() { return 0; } }));
getBacktrace({
    thisprops: 1
})
`)
readline = file = lfcode.shift();
loadFile(file);
function loadFile(lfVarx) {
  evaluate(lfVarx);
}