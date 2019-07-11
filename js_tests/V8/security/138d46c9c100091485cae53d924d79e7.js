// Flags: --allow-natives-syntax
function foo() {
  for (var a = 0; a < 2; a++) {
    if (a === 1) %OptimizeOsr();
    while (0 && 1) {
      for (var j = 1; j < 2; j++) { }
    }
  }
}
foo();
