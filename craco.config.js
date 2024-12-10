const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');
const CompressionPlugin = require('compression-webpack-plugin');
const ESLintPlugin = require('eslint-webpack-plugin');

module.exports = {
  webpack: {
    plugins: [
      new BundleAnalyzerPlugin({
        analyzerMode: process.env.ANALYZE === 'true' ? 'server' : 'disabled',
      }),
      new CompressionPlugin(),
      new ESLintPlugin({
        extensions: ['js', 'jsx'],
        failOnError: false,
        emitWarning: true,
      })
    ],
    configure: (webpackConfig) => {
      webpackConfig.optimization.splitChunks = {
        chunks: 'all',
        minSize: 20000,
        maxSize: 244000,
        minChunks: 1,
        maxAsyncRequests: 30,
        maxInitialRequests: 30,
        cacheGroups: {
          defaultVendors: {
            test: /[\\/]node_modules[\\/]/,
            priority: -10,
            reuseExistingChunk: true,
          },
          default: {
            minChunks: 2,
            priority: -20,
            reuseExistingChunk: true,
          },
        },
      };
      return webpackConfig;
    },
  },
  eslint: {
    enable: true,
    mode: 'extends',
    configure: {
      extends: ['react-app', 'react-app/jest'],
      rules: {
        // Add custom rules here
        'no-console': 'warn',
        'no-unused-vars': 'warn',
      },
    },
  },
  jest: {
    configure: {
      moduleNameMapper: {
        '^@/(.*)$': '<rootDir>/src/$1',
      },
    },
  },
}; 