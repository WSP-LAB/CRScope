WScript = {};
WScript.Echo = console.log;
$ERROR = console.log;
assert = {};
assert.sameValue = function (x
                            ,y
                            ,z) {
       return x == y;
    };
assert.notSameValue =
    function (x,y,z) {
       return not(x == y);
    };
assert.throws = function (x,f) {
       f();
    };
testOption = function (x) {
    };
assert.sameValue(Function.prototype[Symbol.hasInstance].call(0)
                ,false);
assert.sameValue(Function.prototype[Symbol.hasInstance].call({})
                ,false);
