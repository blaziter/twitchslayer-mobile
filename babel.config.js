module.exports = function (api) {
  api.cache(true);

  const presets = ['babel-preset-expo'];
  const plugins = [["wildcard", {
    "exts": ["js", "es6", "es", "jsx", "javascript", "svg", "png", "jpg"],
    "useCamelCase": true
  }]];

  return {
    presets,
    plugins
  };
};
