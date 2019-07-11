var g = newGlobal();
g.offThreadCompileScript("setObjectMetadataCallback('a'); var s = [];");
g.runOffThreadScript();