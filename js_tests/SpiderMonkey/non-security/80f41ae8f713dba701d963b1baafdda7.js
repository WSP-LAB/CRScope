testcase();
function testcase() {
    var tokenCodes  = {
      get try() {
        super.actual();
      }
    };
    var arr = [
        'try',
    ];
    for (var i = 0; i < arr.length; i++) {
        if (tokenCodes[arr[i]] !== i) {};
    }
}