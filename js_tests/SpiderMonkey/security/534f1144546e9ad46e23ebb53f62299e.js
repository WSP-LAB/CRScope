function runTestCase(testcase) {}
var lfGlobal = newGlobal();
for (lfLocal in this) {
    if (!(lfLocal in lfGlobal)) {
        lfGlobal[lfLocal] = this[lfLocal];
    }
}
lfGlobal.offThreadCompileScript(`
  var p = new Proxy({}, {});
  runTestCase.prototype.__proto__ = p;
  fullcompartmentchecks(true);
`);
lfGlobal.runOffThreadScript();