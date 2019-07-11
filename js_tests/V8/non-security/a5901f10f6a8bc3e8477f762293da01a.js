// Create elements in a constructor function to ensure map sharing.
function TestConstructor() {
  this[0] = 1;
  this[1] = 2;
  this[2] = 3;
}
function bad_func(o,a) {
  var s = 0;
  for (var i = 0; i < 1; ++i) {
    o.newFileToChangeMap = undefined;
    var x = a[0];
    s += x;
  }
  return s;
}
o = new Object();
a = new TestConstructor();
bad_func(o, a);
// Make sure that we're out of pre-monomorphic state for the member add of
// 'newFileToChangeMap' which causes a map transition.
o = new Object();
a = new TestConstructor();
bad_func(o, a);
// Optimize, before the fix, the element load and subsequent tagged-to-i were
// hoisted above the map check, which can't be hoisted due to the map-changing
// store.
o = new Object();
a = new TestConstructor();
%OptimizeFunctionOnNextCall(bad_func);
bad_func(o, a);
// Pass in a array of doubles. Before the fix, the optimized load and
// tagged-to-i will treat part of a double value as a pointer and de-ref it
// before the map check was executed that should have deopt.
o = new Object();
// Pass in an elements buffer where the bit representation of the double numbers
// are two adjacent small 32-bit values with the lowest bit set to one, causing
// tagged-to-i to SIGSEGV.
a = [2.122e-314, 2.122e-314, 2.122e-314];
bad_func(o, a);
