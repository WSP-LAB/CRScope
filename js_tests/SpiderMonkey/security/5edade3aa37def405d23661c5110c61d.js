
g("module 'foo' {}");
function g(x) {
  eval(x, g.escaped);
}