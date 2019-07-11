testcase()
function testcase() {
  var tokenCodes  = {};
  tokenCodes['const'] = 0;
  var arr = ['const'];
  for (var p in tokenCodes) {       
      for (var p1 in arr) {                
          if (arr[p1] === p) {
            var p1 = 100 * 1000;
            for (var arr = 0; arr != p1; ++arr) {}
          }
      }
  }
}