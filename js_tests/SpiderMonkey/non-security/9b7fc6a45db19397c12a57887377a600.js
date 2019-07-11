lfLogBuffer = `
  var module = new WebAssembly.Module(wasmTextToBinary(\`(module (func ))\`));
  wasmExtractCode(module);
`;
loadFile();
loadFile();
function loadFile()
  oomTest(Function(lfLogBuffer))