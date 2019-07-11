// Flags: --ignition

function function_with_n_params_and_m_args(n, m) {
  test_prefix = 'prefix ';
  test_suffix = ' suffix';
  var source = 'test_prefix + (function f(';
  for (var arg = 0; arg < n ; arg++) {
    if (arg != 0) source += ',';
    source += 'arg' + arg;
  }
  source += ') { return arg' + (n - n % 2) / 2 + '; })(';
  for (var arg = 0; arg < m ; arg++) {
    if (arg != 0) source += ',';
    source += arg;
  }
  source += ') + test_suffix';
  return eval(source);
}

function_with_n_params_and_m_args(-0x8001, 0x7FFF);
