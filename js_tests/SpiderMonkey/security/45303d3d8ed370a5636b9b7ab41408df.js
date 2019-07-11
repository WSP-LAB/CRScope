setGCCallback({
  action: "majorGC",
});
schedulegc(this)
gcslice(3)
var lfGlobal = newGlobal();
lfGlobal.offThreadCompileScript("");
lfGlobal.runOffThreadScript();