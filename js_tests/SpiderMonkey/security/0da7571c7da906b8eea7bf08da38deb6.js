
evaluate("\
for ( var time = 0, year = 1969; year >= 0; year-- )\
  time -= TimeInYear(year);\
function TimeInYear( y ) {}\
gczeal(4);\
", { noScriptRval : true });
evaluate("setObjectMetadataCallback();", { noScriptRval : true });