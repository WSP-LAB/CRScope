const simpleAsmDef = `
function x(v) {
  v = v | 0;
  return v | 0;
}
return x;`;
WScript.LoadModule(`
    export default function AsmDefaultExport() {
      "use asm"
      ${simpleAsmDef}
    }`)
  