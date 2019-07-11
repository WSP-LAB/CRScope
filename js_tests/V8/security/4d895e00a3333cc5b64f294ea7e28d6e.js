//var _size = 4271300;
//var data = new Uint8Array(_size);

//function out_fun() {
//	'use asm';
//	function in_func() {
//	}
//	return in_func;
//}

//data.sort(out_fun);
function asm() {
  'use asm';
  function f() {}
  return f;
}
for (var i = 0; i < 50000; ++i) {
  asm();
}
