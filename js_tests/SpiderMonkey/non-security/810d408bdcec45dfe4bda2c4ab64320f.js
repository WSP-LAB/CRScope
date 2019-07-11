function Thing(a, b) {
    this.a = a;
}
var array = [];
for (var i = 0; i < 10000; i++ )
    array.push(new Thing(i, i + 1)
);
var proto = new Thing();
var obj = Object.create(proto);