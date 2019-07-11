offThreadCompileScript(`
[null, "", ""].forEach(function(locales) {
  try {
    Intl.NumberFormat(locales)
  } catch (e) {}
  oomAfterAllocations(100);
})
`);
runOffThreadScript()