evalInCooperativeThread("var x = 3");
let PromiseCtor = Promise;
let promises = [];
let p = new PromiseCtor(function(res_, rej_) {});
promises.push(p);
let allPromise = getWaitForAllPromise(promises);