(function(global) {
    var dump = global.dump;
    global.dump = dump;
})(this);
var gTestcases = new Array();
function TestCase(n, d, e, a) {
    ({}).constructor.defineProperty(gTestcases, gTc++, {
        value: this,
    });
    TestCase.prototype.dump = function() {
        dump('\njstest: ' + this.path + ' ' + 'reason: ' + toPrinted(this.reason) + '\n');
    }
}
function toPrinted(value) {
    value = String(value);
    value = value.replace(/\\n/g, 'NL')
}
    for (gTc = 0; gTc < gTestcases.length; gTc++) {}
function jsTestDriverEnd() {
    for (var i = 0; i < gTestcases.length; i++) {
        gTestcases[i].dump();
    }
}
var SECTION = "11.4.7";
new TestCase(SECTION, "-('')", -0, -(""));
5 * (this) + delete RegExp.prototype.flags + (0.0).toLocaleString() + (this);
jsTestDriverEnd();