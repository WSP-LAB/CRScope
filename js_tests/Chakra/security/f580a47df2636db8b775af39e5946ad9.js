function f() {
    arguments;
    WScript.Echo('pass');
}

let call = new Proxy(Function.prototype.call, {}); // proxy calls set the flag
call.call(f);