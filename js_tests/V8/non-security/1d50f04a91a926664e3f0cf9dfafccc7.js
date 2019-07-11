// Make the Object prototype have dictionary properties.
for (var i = 0; i < 2000; i++) {
  Object.prototype['generatedProperty'+i] = true;
}

function boom(a1) {
  with ({}) {}  // Force Turbofan.
  return a1[0];
}

var a = new Array(1);
a[0] = 0.1;
boom(a);
boom(a);
%OptimizeFunctionOnNextCall(boom);
boom(a);

