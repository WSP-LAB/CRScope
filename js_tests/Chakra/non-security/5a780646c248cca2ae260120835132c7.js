function a(arg1, arg2) {
    this[arg1] = arg2;
}
const b = new Proxy(a, {
    construct: function (x, y, z) {
     return {};
  }
});
const boundObject = {};
const c = b.bind(boundObject, "prop-name");
function newTarget() {}
const obj = Reflect.construct(c, ["prop-value-2"], newTarget);
print("DONE")

