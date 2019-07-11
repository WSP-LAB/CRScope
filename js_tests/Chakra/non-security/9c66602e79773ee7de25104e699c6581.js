function getSloppyGenerator() {
  return function* f(x) {};
}

function test(testFunction) {
  testFunction(getSloppyGenerator());
}


function testReconfigureAsAccessorProperty(f) {
  print(f.length);
  var length = 2;
  print(Object.getOwnPropertyDescriptor(f, "length").configurable)
  Object.defineProperty(f, 'length', {
    get: function() { return length; },
    set: function(v) { print("in set"); length = v; }
  });
  print("set");
  f.length = 3;
  print("get " + f.length);

}


test(testReconfigureAsAccessorProperty);
