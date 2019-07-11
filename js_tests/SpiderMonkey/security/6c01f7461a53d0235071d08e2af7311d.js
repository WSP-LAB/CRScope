
function testRegexp(res, mode, strings) {
  try { 
    re = new RegExp(res, mode);
    for (var i = 0; i < strings.length; ++i) {
      var str = strings[i];
      var execResult = re.exec(str);
      uneval(execResult);
    }
  } catch(e) { 
  }
}
testRegexp("(?:\\3{0}|\\2\\1)+", "i", ["", "", "\x7F\x7F", "", "", "", "", "mmmm_mmmm_", "", ""]);