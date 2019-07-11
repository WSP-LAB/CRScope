var lfcode = new Array();
lfcode.push = loadFile;
setJitCompilerOption("ion.warmup.trigger", 20);
lfcode.push(`
function heavyFn1(i) { 
    if (i == 3)
      return [ "isFinite"].map(function (i) {});
    return [];
}
    for (var i = 0; oomAfterAllocations(50); i++)
      heavyFn1(i);
`);
function loadFile(lfVarx) {
    var lfGlobal = newGlobal();
    lfGlobal.offThreadCompileScript(lfVarx);
    lfGlobal.runOffThreadScript();
}