var a = [];
for (var i = 0; i < 200; ++i) a.push({});
var p = Proxy.create({fix: function() { return a; }});
Object.preventExtensions(p);
