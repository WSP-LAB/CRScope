var count = 0;
function f() {
  try {
    f();
  } catch(e) {
    if (count < 100) {
      count++;
      %GetDebugContext();
    }
  }
}
f();
