/* eslint-disable @typescript-eslint/no-var-requires */
const babelOptions = {
  presets: [
    '@babel/preset-react',
    'babel-preset-gatsby',
    '@babel/preset-typescript',
  ],
};

// eslint-disable-next-line import/no-extraneous-dependencies
module.exports = require('babel-jest').createTransformer(babelOptions);
