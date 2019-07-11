function force_deopt() {
  try {
    undefined[{}] = /[abc]/gi;
  } catch(e) {}
}

force_deopt(); 
force_deopt(); 
%OptimizeFunctionOnNextCall(force_deopt); 
force_deopt();
