function _wasmFullPassInternal(assertValueFunc, text, expected, maybeImports, ...args) {
    let binary = wasmTextToBinary(text);
    let retext = wasmBinaryToText(binary);
    assertValueFunc(reinstance.exports.run(...args), expected, "Reformed module must return the expected result");
}
function wasmFullPass(text, expected, maybeImports, ...args) {
    _wasmFullPassInternal(assertEq, text, expected, maybeImports, ...args);
}
var lfLogBuffer = `
wasmFullPass('(module (func (result f32) (f32.const -1)) (export "run" 0))', -1);
`;
loadFile(lfLogBuffer);
loadFile(lfLogBuffer);
function loadFile(lfVarx) {
    try {
      oomTest(function() {
        eval(lfVarx);
      });
    } catch (lfVare) {}
}