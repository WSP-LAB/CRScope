
var g = newGlobal();
function cloneableFunction(body) {
  'use asm';
  function _main() {}
  return _main;
}
g.f = cloneableFunction('return function(x) { return x };');
g.eval("clone(f)()")