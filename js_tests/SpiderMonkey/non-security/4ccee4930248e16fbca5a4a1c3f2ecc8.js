class base {}
class derived extends base {
  constructor() {
    try {
      return;
    } catch (e) {
      try {
        return;
      } catch (e) {}
    }
  }
}
new derived;