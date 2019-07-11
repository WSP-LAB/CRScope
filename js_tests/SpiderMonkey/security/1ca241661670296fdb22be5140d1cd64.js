var lfGlobal = newGlobal();
var src = "var obj = {";
for (var i = 0; i < 140; ++i) {
	src += "prop" + i + ": 2,";
}
src += "}; {";
lfGlobal.offThreadCompileScript(src);
lfGlobal.runOffThreadScript();