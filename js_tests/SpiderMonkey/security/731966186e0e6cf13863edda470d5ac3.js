evaluate(`
  function TestCase() {}
`);
gczeal(15,10);
function f(x) {}
for (var i=0; i<100; i++) {
    f(new TestCase());
}
relazifyFunctions();
relazifyFunctions();
for (var i=0; i<10; i-- ) {}