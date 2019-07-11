function attach() {
  return new Promise(function (r) {
    WScript.Attach(r);
  });
}

async function mainTest() {
  for (let i = 0; i < 1; ++i) {
    await attach();
  }
}
mainTest();
