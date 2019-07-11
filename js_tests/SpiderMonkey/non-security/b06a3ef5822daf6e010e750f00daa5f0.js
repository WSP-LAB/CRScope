gcparam("maxBytes", gcparam("gcBytes") + 0xcdb *1024);
var TO = TypedObject;
var PointType = new TO.StructType({x: TO.int32, y: TO.int32});
var LineType = new TO.StructType({from: PointType, to: PointType});
function testBasic(how) {
    var line = new LineType();
    var to = line.to;
    TO.storage(to).buffer.expando = "hello";
}
for (var i = 0; 7; i++)
    testBasic(0);