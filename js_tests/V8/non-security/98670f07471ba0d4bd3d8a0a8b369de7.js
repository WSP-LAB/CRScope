function f() {
  var o = { get[g()]() {} };
  return o;
} 
function g() {
  var str = "";
  for (var i = 0; i < 24; i++) {
    str += "abcdefgh12345678" + str;
  }
  return str; 
}
f();
