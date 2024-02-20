const path = require('path');

const matchRelativePath = /^\.\.?[/\\]/;

function isAbsolutePath(str) {
  return path.posix.isAbsolute(str) || path.win32.isAbsolute(str);
}

function isRelativePath(str) {
  return matchRelativePath.test(str);
}

// TODO simplify for the next major release
function stringifyRequest(loaderContext, request) {
  if (
    typeof loaderContext.utils !== 'undefined' &&
    typeof loaderContext.utils.contextify === 'function'
  ) {
    return JSON.stringify(
      loaderContext.utils.contextify(loaderContext.context, request),
    );
  }

  const splitted = request.split('!');
  const { context } = loaderContext;

  return JSON.stringify(
    splitted
      .map((part) => {
        // First, separate singlePath from query, because the query might contain paths again
        const splittedPart = part.match(/^(.*?)(\?.*)/);
        const query = splittedPart ? splittedPart[2] : '';
        let singlePath = splittedPart ? splittedPart[1] : part;

        if (isAbsolutePath(singlePath) && context) {
          singlePath = path.relative(context, singlePath);

          if (isAbsolutePath(singlePath)) {
            // If singlePath still matches an absolute path, singlePath was on a different drive than context.
            // In this case, we leave the path platform-specific without replacing any separators.
            // @see https://github.com/webpack/loader-utils/pull/14
            return singlePath + query;
          }

          if (isRelativePath(singlePath) === false) {
            // Ensure that the relative path starts at least with ./ otherwise it would be a request into the modules directory (like node_modules).
            singlePath = `./${singlePath}`;
          }
        }

        return singlePath.replace(/\\/g, '/') + query;
      })
      .join('!'),
  );
}

function getImportLinkContentCode(esModule, loaderContext, request) {
  const modulePath = stringifyRequest(loaderContext, `!!${request}`);

  return esModule
    ? `import content from ${modulePath};`
    : `var content = require(${modulePath});`;
}

function getExportStyleCode(esModule, loaderContext, request) {
  const modulePath = stringifyRequest(loaderContext, `!!${request}`);

  return esModule
    ? `export * from ${modulePath};
         export default content && content.locals ? content.locals : undefined;`
    : 'module.exports = content && content.locals || {};';
}

module.exports = {
  stringifyRequest,
  getImportLinkContentCode,
  getExportStyleCode,
};
