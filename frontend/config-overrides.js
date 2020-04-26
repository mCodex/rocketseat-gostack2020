// eslint-disable-next-line import/no-extraneous-dependencies
const { addBabelPlugins, override } = require('customize-cra');

module.exports = override(
  ...addBabelPlugins([
    'babel-plugin-root-import',
    {
      rootPathSuffix: 'src',
    },
  ])
);
