const Path = require('path');
const HtmlPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = (env = {}) => {
  const IS_DEV = env.mode === 'development';
  const IS_PROD = !IS_DEV;

  const getPlugins = () => {
    const plugins = [
      new HtmlPlugin({
        template: 'src/index.html'
      })
    ];

    if (IS_PROD) {
      plugins.push(
        new MiniCssExtractPlugin({
          filename: 'assets/style/style-[contenthash:5].css'
        })
      );
    }

    return plugins;
  };

  const getStyleLoaders = () => {
    return [
      IS_PROD ? MiniCssExtractPlugin.loader : 'style-loader',
      'css-loader',
      'postcss-loader',
      'sass-loader'
    ];
  };

  return {
    name: 'client',
    mode: IS_DEV ? 'development' : 'production',
    devtool: IS_DEV ? 'inline-source-map' : 'source-map',
    entry: Path.join(process.cwd(), 'src', 'index.tsx'),
    output: {
      path: Path.join(process.cwd(), 'dist'),
      filename: 'assets/js/script-[contenthash:5].js',
      clean: true
    },
    resolve: {
      extensions: ['.js', '.jsx', '.ts', '.tsx', '.scss']
    },

    devServer: {
      static: {
        directory: Path.join(process.cwd(), 'dist')
      },
      port: 9000,
      open: 'public',
      compress: true,
      historyApiFallback: true,
      proxy: {
        '/api': `http://127.0.0.1:${9100}`
      }
    },

    plugins: getPlugins(),

    module: {
      rules: [

        // loading js/ts
        {
          test: /\.(js|jsx|ts|tsx)$/,
          exclude: /node_modules/,
          use: [
            'babel-loader'
          ]
        },

        // loading styles
        {
          test: /\.(scss|sass)$/,
          use: getStyleLoaders()
        },

        // loading fonts
        {
          test: /\.(woff|woff2|ttf)$/,
          type: 'asset/resource',
          generator: {
            filename: 'assets/fonts/[name]-[contenthash:5].[ext]'
          }
        }
      ]
    }
  };
};
