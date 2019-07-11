(function(m) {
    "use asm"
    var k = m.SIMD.Bool32x4
    function f() {
        var x = k(0, 0, 0, 0)
        frd(x);
    }
});