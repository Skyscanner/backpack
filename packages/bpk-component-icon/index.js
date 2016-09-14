function requireAll (requireContext) {
  const hash = {}
  requireContext.keys().map((key) => {
    const moduleName = key.replace('./', '').replace('.js', '')
    hash[ moduleName ] = requireContext(key).default
  })
  return hash
}

module.exports = {
  sm: requireAll(require.context('./sm', false, /\.js$/)),
  lg: requireAll(require.context('./lg', false, /\.js$/))
}
