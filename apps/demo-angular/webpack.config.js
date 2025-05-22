const webpack = require('@nativescript/webpack');
require('dotenv').config();

module.exports = (env) => {
  webpack.init(env);
  webpack.useConfig('angular');

  webpack.Utils.addCopyRule({
    from: '../../../tools/assets/images',
    to: 'assets/images',
    context: webpack.Utils.project.getProjectFilePath('node_modules'),
  });

  return webpack.resolveConfig();
};
