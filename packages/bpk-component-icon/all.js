const requireAll = (requireContext) => {
  const hash = {};

  requireContext.keys().forEach((key) => {
    const moduleName = key.replace('./', '').replace('.js', '');
    const moduleParts = moduleName.split('/');

    if (!hash[moduleParts[0]]) {
      hash[moduleParts[0]] = {};
    }

    hash[moduleParts[0]][moduleParts[1]] = requireContext(key).default;
  });

  return hash;
};

export default requireAll(require.context('./', true, /\.\/(?!src|node_modules).*\/.*\.js$/));
