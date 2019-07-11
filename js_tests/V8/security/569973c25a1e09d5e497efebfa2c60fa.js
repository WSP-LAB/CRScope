function foo(bar)  {
  return arguments[bar];
}
foo(0);           // Handled in runtime.
foo(-536870912);  // Triggers bug.
