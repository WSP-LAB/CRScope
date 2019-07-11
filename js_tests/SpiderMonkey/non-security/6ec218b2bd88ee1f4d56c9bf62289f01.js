// Randomly chosen test: js/src/tests/ecma_5/Date/fractions.js
Date();
// Randomly chosen test: js/src/jit-test/tests/basic/bug623859.js
try {
    gcparam("maxBytes", gcparam("gcBytes") + 1);
    eval("\
        var a = [];\
        for (var i = 0; i < 99999; ++i) {\
            a[i] = [];\
        }\
    ")
} catch (e) {}
// Randomly chosen test: js/src/jit-test/tests/ion/inlining/TypedObject-storage-transparent.js
if (TypedObject) {};