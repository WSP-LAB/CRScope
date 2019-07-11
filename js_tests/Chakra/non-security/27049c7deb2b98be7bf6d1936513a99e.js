var {proxy, revoke} = Proxy.revocable(() => {}, {
  get apply() {
    revoke();
  }
});

proxy();
