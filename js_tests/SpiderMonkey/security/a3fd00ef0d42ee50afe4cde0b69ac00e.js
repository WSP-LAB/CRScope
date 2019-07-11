setJitCompilerOption("ion.warmup.trigger", 20);
loadFile(`
  function test(obj) {
    var it = Array.prototype[Symbol.iterator].call(obj);
    for (var i = 0; i < (obj.length >>> 0); i++)
        unescape(it, obj[i]);
  }
  test({});
  test({});
  test({ length: 2, });
  test(Object.create(['x', 'y', 'z']));
  test(Object.create({ length: 2, 1: 'y'}));
  test("");
  test("ponies");
`);
function loadFile(lfVarx) {
  function newFunc(x) {
    new Function(x)();
  };
  newFunc(lfVarx);
  var lfGlobal = newGlobal();
  lfGlobal.offThreadCompileScript(lfVarx);
  lfGlobal.runOffThreadScript();
  evaluate(lfVarx, {});
}