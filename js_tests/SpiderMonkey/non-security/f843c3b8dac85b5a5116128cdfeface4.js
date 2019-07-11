try { 
  (async function f() {})([], 1);
  const Module = WebAssembly.Module;
  const Instance = WebAssembly.Instance;
  const m1 = new Module(wasmTextToBinary(`(module (func $f) (export "f" $f))`));
  const m2 = new Module(wasmTextToBinary(`(module (import "a" "f") (func $f) (export "g" $f))`));
  var i1 = new Instance(m1);
  var i2 = new Instance(m2, {a:i1.exports});
  var g = i2.exports.g;
  (async function f() {
    var inner = (function testmath() {
      return g.caller;
    })();
  })([], 1);
} catch(exc) {}