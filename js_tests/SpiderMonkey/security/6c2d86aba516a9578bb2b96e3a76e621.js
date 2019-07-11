gczeal(2, 10);
var g = newGlobal();
var elt = new g.Object;
g.offThreadCompileScript('debugger;', {
    element: elt,
});
var g = newGlobal();
g.runOffThreadScript();