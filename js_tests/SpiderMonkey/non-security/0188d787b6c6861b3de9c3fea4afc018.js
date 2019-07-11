x = Object
try {
    (function() {
        "use strict";
        eval("\
            Object.toSource = (function() {\
                \"use asm\";\
                function f() {}\
                return f\
            })\
        ")
    })()
} catch (e) {}
print(uneval(x))
