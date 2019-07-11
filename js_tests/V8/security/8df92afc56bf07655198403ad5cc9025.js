var a = [0,1,2,3];
a[2000000] = 2000000;
a.length=2000;
for (var i = 0; i <= 256; i++) {
  a[i] = new Object();
}
