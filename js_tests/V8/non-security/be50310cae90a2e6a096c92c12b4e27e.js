function g() {
  for (var x in [0]) {
    try {
      while (true);
    } catch(e) {
      continue;
    }
  }
}
g();
