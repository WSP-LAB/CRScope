b = {};
b.__proto__ = evalcx(("new Date('1/1/1999 13:30 PM')"));
function g() {
    g(b.toString())
}
g();