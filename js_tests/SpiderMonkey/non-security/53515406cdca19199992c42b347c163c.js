
gcparam("maxBytes", gcparam("gcBytes") + 4*1024);
function foo() {
    var re = /erwe/;
    foo(re.multiline);
}
foo();