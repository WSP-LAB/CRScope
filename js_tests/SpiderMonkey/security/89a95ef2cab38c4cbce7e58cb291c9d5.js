var wrapper = evaluate("({a: 15, b: {c: 42}})", {
    global: newGlobal({})
});
nukeCCW(wrapper);
gczeal(8, 1);
switch (lfRunTypeId) {}