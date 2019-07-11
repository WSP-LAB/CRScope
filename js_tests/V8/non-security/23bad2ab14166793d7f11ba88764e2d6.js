function g() {
    g.arguments;
  }
  function f() {
    [0].forEach(g);
  }
  f();
  f();
  %OptimizeFunctionOnNextCall(f);
  f();
