function __f_3(a, b, c) {
 this.b = b;
 this.c = c;
}
__v_2 = new __f_3(1, 2, 3.5);
__v_1 = new __f_3(1, 2.5, 3);
function __f_2(o) {
 o.d = 1;
}
__f_2(__v_2);
(function __f_5() {
  Object.assign(__v_1, __v_1);
})();
