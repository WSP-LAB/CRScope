
var lfcode = new Array();
lfcode.push("");
lfcode.push("");
lfcode.push("1");
lfcode.push("");
lfcode.push("");
lfcode.push("");
lfcode.push("");
lfcode.push("2");
lfcode.push("gczeal(4);");
lfcode.push("setObjectMetadataCallback(function(obj) {});");
while (true) {
  var file = lfcode.shift(); if (file == undefined) { break; }
  loadFile(file)
}
function loadFile(lfVarx) {
    try {
        if (lfVarx.substr(-3) != ".js" && lfVarx.length != 1) {
            switch (lfRunTypeId) {
                case 2: new Function(lfVarx)(); break;
            }
        } else if (!isNaN(lfVarx)) {
            lfRunTypeId = parseInt(lfVarx);
        }
    } catch (lfVare) {
    }
}