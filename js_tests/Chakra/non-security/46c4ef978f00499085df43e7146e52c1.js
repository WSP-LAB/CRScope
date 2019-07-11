WScript.LoadModule(`
function AsmModule() {
  "use asm"
  function x(v) {
    v = v | 0;
    return v | 0;
  }
  return x;
}`)
