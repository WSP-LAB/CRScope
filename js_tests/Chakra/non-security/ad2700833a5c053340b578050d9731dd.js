var {proxy, revoke} = Proxy.revocable({a: 0}, new Proxy({}, {
    get(t, pk) {
        if (pk === "getOwnPropertyDescriptor")
            revoke();
    }
}));
Object.keys(proxy);
