function asm() {
  'use asm';
  function f() {}
  return f;
}
for (var i = 0; i < 50000; ++i) {
  asm();
}
