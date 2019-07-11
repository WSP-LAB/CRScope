var it = function*() {
  try {
    throw [void 0];
  } catch ([c = (yield c)]) {
  }
}();

it.next();
