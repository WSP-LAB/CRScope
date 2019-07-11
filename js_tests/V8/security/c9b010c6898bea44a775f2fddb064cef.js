function f(x, y) {
  if (x == 149999) { 
        x+''; 
        gc(); 
  }
}
for (var i = 0; i < 150000; i++) {
  new f(i);
}
