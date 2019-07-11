function a()
{
    gc();
}

function test()
{
    var obj = { get __noSuchMethod__() {
	return new Object();
    }};
    
    obj.x(a());
}
test();
