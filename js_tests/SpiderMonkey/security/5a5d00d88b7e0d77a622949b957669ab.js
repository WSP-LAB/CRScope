Object.defineProperty(Array, Symbol.species, {
    value: function() {
        return new Proxy(["?"], {
            get(t, pk, r) {
                return Reflect.get(t, pk, r);
            },
            defineProperty(t, pk, desc) {
                return true;
            }
        });
    }
})

var r = Intl.Collator("de-u-co-phonebk").compare("x", "X");
print(r);
