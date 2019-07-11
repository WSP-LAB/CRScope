var gTestcases = new Array();
function TestCase(n, d, e, a)
{
  gTestcases[gTc++] = this;
  for ( gTc=0; gTc < gTestcases.length; gTc++ ) {
  }
}
try {
var SECTION = "15.5.4.11-6";
for ( var i = 0x0530; i <= 0x058F; i++ ) {
  new TestCase(   SECTION,
		  eval("var s = new String( String.fromCharCode(i) ); s.toLowerCase().charCodeAt(0)") );
}
var gTc= 0;
} catch(exc2) {}
while(true) {
function stopTest()
{
    gc();
}
test();
function test() {
  for ( 0; gTc < gTestcases.length; gTc++ ) {
    var MYOBJECT = new MyObject();
  }
  stopTest();
}
function MyObject( n ) {
  this.__proto__ = Number.prototype;
}
}
