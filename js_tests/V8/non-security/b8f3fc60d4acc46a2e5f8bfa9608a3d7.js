var z = {valueOf: function() { return 3; }};


function f() {
  var y = -2;
  return (1 & z) - y++;
}

//assertEquals(3, f());
//assertEquals(3, f());
f();
f();
%OptimizeFunctionOnNextCall(f);
//assertEquals(3, f());
f();

function g() {
  var y = 2;
  return (1 & z) | y++;
}

//assertEquals(3, g());
//assertEquals(3, g());
g();
g();
%OptimizeFunctionOnNextCall(g);
//assertEquals(3, g());
g();

function h() {
  var y = 3;
  return (3 & z) & y++;
}

//assertEquals(3, h());
//assertEquals(3, h());
h();
h();
%OptimizeFunctionOnNextCall(h);
//assertEquals(3, h());
h();

function i() {
  var y = 2;
  return (1 & z) ^ y++;
}

//assertEquals(3, i());
//assertEquals(3, i());
i();
i();
%OptimizeFunctionOnNextCall(i);
//assertEquals(3, i());
i();
