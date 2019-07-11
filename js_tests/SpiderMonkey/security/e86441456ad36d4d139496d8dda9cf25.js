for (lfLocal in this) {}
function foo() {
var T = TypedObject;
var ObjectStruct = new T.StructType({
    f: T.Object
});
var o = new ObjectStruct();
function writeObject(o, v, expected) {
    o.f = v;
}
for (var i = 0; i < 5; i++)
    writeObject(o, {}, "helo");
for (var i = 0; i < 5; i++)
    writeObject(o, null, "null");
writeObject(o, "three", "three");
for (var i = 0; oomAfterAllocations(1); i++)
    writeObject(o, 4.5, "4.5");
writeObject(o, undefined, "");
for (var i = 0;
    (class get {}.get++) < 5; i++)
    writeString(s, 4.5, "4.5");var lfcode = new Array();
} foo();