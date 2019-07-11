
test();
function test() {
  function v() {
    try { 
	test(/x{2147483647,2147483648}x/.test('1'), false); 
    } catch (actual) {}
  }
  v();
}