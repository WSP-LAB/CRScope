var s = "xxxxxxxx";
var t = "xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx"; // 31 characters
var r1 = t + s;
var r2 = r1 + s;
r2.match(/x/);
r3 = r2 + s;
r3.match(/x/);
parseModule(r2);
dumpStringRepresentation(r1);