evalInWorker(`
  function f() { f(); }
  evalInWorker('#3: myObj.p1 === "a". Actual:  myObj.p1 ===' + f.caller  );
`);