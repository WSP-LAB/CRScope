var getterCalled = false;
            var a = [1, 2];
            for (var i = 0; i < 100 * 1024; i++) {
                a.push(i);
            }
            delete a[0]; // Make a missing item
            var protoObj = [11];
            Object.defineProperty(protoObj, '0', {
                get : function () {
                    getterCalled = true;
                    Object.setPrototypeOf(a, Array.prototype);
                    a.splice(0); // head seg is now length=0
                    return 42;
                },
                configurable : true
            });
            Object.setPrototypeOf(a, protoObj);
            var b = a.slice();
            //assert.isTrue(getterCalled);
            //assert.areEqual(0, a.length, "Getter will splice the array to zero length");
            //assert.areEqual(100 * 1024 + 2, b.length, "Validating that slice will return the full array even though splice is deleting the whole array");
