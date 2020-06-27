module.exports = {
  presets: ['module:metro-react-native-babel-preset'],
  plugins: [
    [
      'module-resolver',
      {
        cwd: 'babelrc',
        extensions: ['.ts', '.tsx', '.js', '.ios.js', '.android.js'],
        alias: {
          '@pages': './src/pages',
          '@components': './src/components',
          '@hooks': './src/hooks',
          '@colors': './src/colors',
          '@services': './src/services',
        },
      },
    ],
    'jest-hoist',
  ],
};
