
var lfcode = new Array();
lfcode.push("");
lfcode.push("");
lfcode.push("");
lfcode.push("x = function () { return arr.length; }");
lfcode.push("");
lfcode.push("");
lfcode.push("enableSPSProfiling();");
lfcode.push("");
lfcode.push("\
    x >>=  /x/;\
    (function f() {\
        x.r = x;\
        return f()\
    })();\
");
for (lfx in lfcode) { loadFile(lfcode[lfx]); }
function loadFile(lfVarx) {
    try {
        evaluate(lfVarx, { noScriptRval : true, compileAndGo : true }); 
    } catch (lfVare) {}
}