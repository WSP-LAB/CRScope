var lfcode = new Array();
lfcode.push = loadFile;
oomAfterAllocations(50, 2);
lfcode.push(`
        "use asm";
        function f() {
            return +pow(.0, .0)
`);
function loadFile(lfVarx) {
            eval("(function() { " + lfVarx + " })();");
}