 function Base() { }

  Base.prototype = {
    f() {
      return "Base " + this.toString();
    },
    x: 15,
    toString() {
      return "this is Base";
    }
  };

  function Derived() {
    this.derivedDataProperty = "xxx";
  }
  Derived.prototype = {
    __proto__: Base.prototype,
    toString() { return "this is Derived"; },
    x: 27,
    f() {

      var a = super.x;

      print(this.x);
      return "Derived";
    }
  };

  print(new Base().f());
  print(new Derived().f());
