
function m() {
    "use asm";
    function f() {
        var x = 0;
        var y = 0;
        y = y[(x + 1) & 3]() | 0;
    }
    return f;
}
m()();