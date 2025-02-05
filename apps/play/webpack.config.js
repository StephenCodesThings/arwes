const path = require('path');
const TsconfigPathsPlugin = require('tsconfig-paths-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const MonacoWebpackPlugin = require('monaco-editor-webpack-plugin');

const { NODE_ENV } = process.env;
const CWD = __dirname;
const REPOSITORY_PATH = path.join(CWD, '../../');
const TSCONFIG_FILE_PATH = path.join(CWD, 'tsconfig.json');
const SRC_PATH = path.join(CWD, 'src');
const BUILD_PATH = path.join(CWD, 'build');
const BASE_PATH = '/play/'; // Must end with "/".

const mode = NODE_ENV || 'development';
const isProduction = mode === 'production';

module.exports = {
  mode,
  devtool: false,
  entry: {
    playground: path.join(SRC_PATH, 'playground/playground.tsx'),
    sandbox: path.join(SRC_PATH, 'sandbox/sandbox.tsx')
  },
  output: {
    path: path.join(BUILD_PATH, BASE_PATH),
    filename: '[name].js',
    publicPath: BASE_PATH,
    clean: true
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'ts-loader',
            options: {
              configFile: TSCONFIG_FILE_PATH,
              transpileOnly: true
            }
          }
        ]
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader']
      },
      {
        test: /\.md$/i,
        use: 'raw-loader'
      }
    ]
  },
  resolve: {
    extensions: ['.js', '.jsx', '.ts', '.tsx'],
    plugins: [
      new TsconfigPathsPlugin({
        configFile: TSCONFIG_FILE_PATH
      })
    ],
    alias: {
      '@repository': REPOSITORY_PATH
    }
  },
  plugins: [
    new MonacoWebpackPlugin({
      publicPath: BASE_PATH,
      languages: ['javascript', 'typescript']
    }),
    new HtmlWebpackPlugin({
      publicPath: BASE_PATH,
      template: path.join(SRC_PATH, 'playground/playground.html'),
      filename: path.join(BUILD_PATH, BASE_PATH, 'index.html'),
      chunks: ['playground']
    }),
    new HtmlWebpackPlugin({
      publicPath: BASE_PATH,
      template: path.join(SRC_PATH, 'sandbox/sandbox.html'),
      filename: path.join(BUILD_PATH, BASE_PATH, 'sandbox/index.html'),
      chunks: ['sandbox']
    }),
    isProduction && new CopyWebpackPlugin({
      patterns: [{
        from: path.join(REPOSITORY_PATH, 'static'),
        to: BUILD_PATH
      }]
    })
  ].filter(Boolean),
  devServer: {
    static: [{
      directory: BUILD_PATH,
      publicPath: BASE_PATH,
      watch: true
    }, {
      directory: path.join(REPOSITORY_PATH, 'static'),
      publicPath: '/',
      watch: true
    }],
    allowedHosts: 'all',
    compress: true,
    host: '127.0.0.1',
    port: 9000,
    open: BASE_PATH
  }
};
