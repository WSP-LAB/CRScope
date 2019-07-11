STATUS = "STATUS "
function printStatus(msg) {
    lines = msg.split();
    print(STATUS + lines[0]);
}
Object.defineProperty(Object.prototype, 'e', {});
Object.prototype.apply = summary = 'GC without recursion';
Object.prototype[0] = /a/
printStatus(summary);
oomAfterAllocations(10);
printStatus(summary)({}.__proto__.watch('x', print));