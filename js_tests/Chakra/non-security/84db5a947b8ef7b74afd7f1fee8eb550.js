var i = 0;
JSON.stringify(new Proxy([], {
    get(t, pk, r){
        if (pk === "length") {
            return ++i;
        }
        return Reflect.get(t, pk, r);
    }
}));

