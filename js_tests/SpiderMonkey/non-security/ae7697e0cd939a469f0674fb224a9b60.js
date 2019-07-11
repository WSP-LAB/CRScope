var dbg = new Debugger;
dbg.onNewGlobalObject = function(global) {};
evalInCooperativeThread("var x = 3");