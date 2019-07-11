var lfOffThreadGlobal = newGlobal();
enableShellAllocationMetadataBuilder()
lfOffThreadGlobal.offThreadCompileScript(`
    gczeal(8, 1)
    function recurse(x) {
      recurse(x + 1);
    };
  recurse(0);
`);
lfOffThreadGlobal.runOffThreadScript();