gczeal(4);
evalInCooperativeThread('\
  for (var i = 0; i < 10; i++) {\
     interruptIf(true);\
  }\
');