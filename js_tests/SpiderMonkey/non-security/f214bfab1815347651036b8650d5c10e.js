offThreadCompileScript(`
 oomTest(() => "".search(/d/));
 fullcompartmentchecks(3);
`);
runOffThreadScript();