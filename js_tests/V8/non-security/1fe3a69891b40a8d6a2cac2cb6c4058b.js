function replace(string) {
  return string.replace(/L/g, "\ud800")
               .replace(/l/g, "\ud801")
               .replace(/T/g, "\udc00")
               .replace(/\./g, ("Empty array []"));
}
function test(regexp_source, subject) {
  subject = replace(subject);
  regexp_source = replace(regexp_source);
  new RegExp(regexp_source, "u").exec(subject);
}
test("(L).*\\1(.)", "LLTLl");
