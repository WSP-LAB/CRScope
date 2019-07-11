function ax(f) f();
function test_one(pattern, val) {
    eval(`
      function* g${0}
       (${pattern}) {}
        [g${0}(${"[]"})]
    `);
}
function test(expr) {
    pattern = `[a=${expr}]`;
    test_one(pattern);
}
test(`class E {[ ax(() => TypeError)]() {}}`);