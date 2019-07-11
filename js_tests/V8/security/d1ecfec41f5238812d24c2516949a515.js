var str = "ABX X";
str = str.replace(/(\w)?X/g, function(match, capture) {});
function test() {
  try {
    test(7, 'right');
  } catch(e) {
    "bar.foo baz......".replace(/(ba.).*?f/g, function() { return "x";});
  }
}
test();
