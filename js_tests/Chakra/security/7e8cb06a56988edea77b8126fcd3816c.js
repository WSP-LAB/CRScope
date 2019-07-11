const simpleAsmDef = `
function x(v) {
  v = v | 0;
  return v | 0;
}
return x;`;
eval(`
    class BaseClass {}
    class MyClass extends BaseClass {
      f(a,b,c,d,e) {
        print(a);
      }
      constructor() {
        "use asm";
        ${simpleAsmDef}
      }
    }
    var x = new MyClass("df");
    x(3);
  `)