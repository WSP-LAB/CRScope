oomTest(() => {
    offThreadCompileScript(`
      "use asm";
      return assertEq;
    `);
    runOffThreadScript();
});