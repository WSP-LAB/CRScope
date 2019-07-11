var evalInFrame = (function (global) {
  var dbgGlobal = newGlobal();
  var dbg = new dbgGlobal.Debugger();
  return function evalInFrame(upCount, code) {
    dbg.addDebuggee(global);
    var frame = dbg.getNewestFrame().older;
    for (var i = 0; i < upCount; i++) {
      if (!frame.older)
        break;
      frame = frame.older;
    }
    var completion = frame.eval(code);
  };
})(this);
Object.defineProperty(this, "fuzzutils", {
});
var lfCodeBuffer = "";
var lfGlobalFunc = undefined;
var lfModule = new WebAssembly.Module(wasmTextToBinary(`
    (module
        (import "global" "func" (result i32))
        (func (export "func_0") (result i32)
         call 0 ;; calls the import, which is func #0
        )
    )
`));
for (i = 0; i < 20; ++i)
  processCode(`
    evalInFrame(1, "a = 43");
  `);
function processCode(lfVarx) {
    try {
        processModule(lfModule, lfVarx);
    } catch (lfVare) {}
}
function processModule(module, jscode) {
    imports = {}
    for (let descriptor of WebAssembly.Module.imports(module)) {
        imports[descriptor.module] = {}
        if (lfGlobalFunc) {} else {
            imports[descriptor.module][descriptor.name] = new Function("x", "y", "z", jscode);
            try {
                instance = new WebAssembly.Instance(module, imports);
            } catch (exc) {}
        }
    }
    for (let descriptor of WebAssembly.Module.exports(module)) {
        switch (descriptor.kind) {
            case "function":
                print(instance.exports[descriptor.name]())
        }
    }
}