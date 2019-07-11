function h(a,b){
  for(var i=0; i<a.length; i++) {h(a[i],b[i]); }
}

function g() {
  h(arguments.length, 2);
}

function f() {
  return g(1, 2);
}

b = [1,,];
b[1] = 3.5;

h(b, [1073741823, 2147483648, -12]);

f();
f();
%OptimizeFunctionOnNextCall(f);
f();
