const simpleAsmDef = `
function x(v) {
  v = v | 0;
  return v | 0;
}
return x;`;
eval(`
    var o = {
      set m(stdlib) {
        "use asm"
        var I32 = stdlib.Int32Array;
        ${simpleAsmDef}
      }
    }
    o.m = 5;
  `)