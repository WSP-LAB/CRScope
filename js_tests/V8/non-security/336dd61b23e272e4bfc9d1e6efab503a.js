class Base {}
class Subclass extends Base {
  constructor() {
    %DeoptimizeNow();
    super();
  }
}
new Subclass();
new Subclass();
%OptimizeFunctionOnNextCall(Subclass);
new Subclass();
