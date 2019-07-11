var lfcode = new Array();
var lfRunTypeId = -1;
lfcode.push = loadFile;
oomAfterAllocations(10, 2);
lfcode.push(`
function mod(stdlib, ffi, heap) {
    "use asm";
    function f3(k) {
        k = k | 0;
    }
    function g3(k) {}
`);
function loadFile(lfVarx) {
    switch (lfRunTypeId) {
        default: evaluate(lfVarx, {
        });
    }
}