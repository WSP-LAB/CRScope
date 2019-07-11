enableGeckoProfiling();
evaluate(`
evalInCooperativeThread(\`
  setInterruptCallback(function() { 
	cooperativeYield();
  });
  interruptIf(true);
\`);
`);