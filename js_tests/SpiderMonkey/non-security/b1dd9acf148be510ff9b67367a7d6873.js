gczeal(10);
var TO = TypedObject;
var PointType = new TO.StructType({});
var LineType = new TO.StructType({ from: PointType, });
var line = new LineType();
var from = line.from;
var dataview = new DataView(TO.storage(from).buffer);