const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin')
const UglifyJsPlugin = require("uglifyjs-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin");
const path = require('path');
const { spawn } = require('child_process');

const inDevelopment = process.env.NODE_ENV !== 'production';
const outDir = path.join(__dirname, '/dist');

module.exports = {
  entry: './src/client/index.js',
  output: {
    path: outDir,
    publicPath: '/',
    filename: 'app.js',
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: ['babel-loader'],
      },
      {
        test: /\.css$/,
        use: [
          inDevelopment ? 'style-loader' : MiniCssExtractPlugin.loader,
          "css-loader"
        ]
      },
      { test: /\.(jpg|gif|png|svg|mp4)$/, use: [{ loader: 'file-loader' }] },
      { test: /\.woff(\?v=\d+\.\d+\.\d+)?$/, use: [{ loader: 'file-loader' }] },
      { test: /\.woff2(\?v=\d+\.\d+\.\d+)?$/, use: [{ loader: 'file-loader' }] },
      { test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/, use: [{ loader: 'file-loader' }] },
      { test: /\.eot(\?v=\d+\.\d+\.\d+)?$/, use: [{ loader: 'file-loader' }] },
    ]
  },
  resolve: {
    extensions: ['*', '.js', '.jsx'],
  },
  optimization: {
    minimizer: [
      new UglifyJsPlugin({
        cache: true,
        parallel: true,
        sourceMap: true,
      }),
      new OptimizeCSSAssetsPlugin({}),
    ]
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new HtmlWebpackPlugin({
      template: './src/client/index.ejs'
    }),
    new MiniCssExtractPlugin({
      filename: "[name].css",
      chunkFilename: "[id].css"
    }),
  ],
  devServer: {
    contentBase: './dist',
    hot: true,
    host: '0.0.0.0',
    port: '8080',
    proxy: {
      '/containers': 'http://localhost:9090'
    },
    setup() {
      console.log('Staring Server Process...');
      spawn(
        'npm',
        ['run', 'start-server'],
        { shell: true, env: process.env, stdio: 'inherit' }
      )
        .on('close', code => process.exit(code))
        .on('error', spawnError => console.error(spawnError));
    }
  }
};
