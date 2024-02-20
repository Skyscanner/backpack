const utils = require('./utils');

const loader = function loader(content) {
  if (
    this._compiler &&
    this._compiler.options &&
    this._compiler.options.experiments &&
    this._compiler.options.experiments.css &&
    this._module &&
    (this._module.type === "css" ||
      this._module.type === "css/global" ||
      this._module.type === "css/module" ||
      this._module.type === "css/auto")
  ) {
    return content;
  }
};

loader.pitch = function pitch(request) {
  const esModule = true;
  if (
    this._compiler &&
    this._compiler.options &&
    this._compiler.options.experiments &&
    this._compiler.options.experiments.css &&
    this._module &&
    (this._module.type === "css" ||
      this._module.type === "css/global" ||
      this._module.type === "css/module" ||
      this._module.type === "css/auto")
  ) {
    this.emitWarning(
      new Error(
        'You can\'t use `experiments.css` (`experiments.futureDefaults` enable built-in CSS support by default) and `style-loader` together, please set `experiments.css` to `false` or set `{ type: "javascript/auto" }` for rules with `style-loader` in your webpack config (now `style-loader` does nothing).'
      )
    );
    return;
  } 
  return `
  ${utils.getImportLinkContentCode(false, this, request)}
  var exported = {};
  content = content.__esModule ? content.default : content;
  exported.locals = content.locals || {};
  ${utils.getExportStyleCode(false, this, request)}
  `
}


module.exports = loader;