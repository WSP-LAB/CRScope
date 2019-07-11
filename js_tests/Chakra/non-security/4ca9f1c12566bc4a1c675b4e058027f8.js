var arrowInsideWithEval;

with ({}) {
arrowInsideWithEval = (s) => eval(s);
arrowInsideWithEval("this");
}
