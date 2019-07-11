function __f_6(expectation, regexp, subject) {
 regexp.exec(subject);
}
function __f_7(expectation, regexp_source, subject) {
  __f_6(expectation, new RegExp(regexp_source, "u"), subject);
}
__f_7(null, "[^\u{1}-\u{65535}]", "\u{12358}");

