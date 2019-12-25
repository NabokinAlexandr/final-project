const path = require('path');
const webpack = require('webpack');
const ExtractCssChunks = require("extract-css-chunks-webpack-plugin");
const CleanWebpackPlugin = require('clean-webpack-plugin'); 
const HtmlWebpackPlugin = require('html-webpack-plugin');

let pathsToClean = ['dist', 'build']

let cleanOptions = {
    root: process.cwd(),
    exclude: ['shared.js'],
    verbose: true,
    dry: false
}

const config = {
    target: "web",
    entry: {
        "main": ["./src/main.js", "./src/assets/main.scss"]
    }, 
    resolve: {
        extensions: [".tsx", ".js", ".scss", ".css", ".json"],
        alias: {
            jquery: "jquery/src/jquery"
        }
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                    loader: "babel-loader",
                    options: {
                        presets: ["@babel/preset-env"]
                    }
                }
            },
            {
                test: /\.(sass|scss)$/,
                use: [ExtractCssChunks.loader, "css-loader", "postcss-loader", "sass-loader"],
            },
            {
                test: /\.js$/,
                enforce: "pre",
                exclude: /node_modules/,
                loader: "eslint-loader"
            },
            {
                test: /\.(jpg|png|mp4)$/,
                loader: 'url-loader',
                options: {
                    limit: 5000,
                    name: '[path][name].[ext]'
                }
            },
            {
                test: /\.(woff|woff2|ttf|eot|svg)$/,
                loader: 'url-loader',
                options: {
                    limit: 5000,
                    name: '[path][name].[ext]'
                }
            }
        ]
    },
    plugins: [
        new ExtractCssChunks({
            filename: "assets/[name].css",
            chunkFilename: "assets/[name].css",
            hot: true, 
            orderWarning: true, 
            reloadAll: true, 
            cssModules: true
        }),
        new HtmlWebpackPlugin(
            {
                chunks: ['main', 'common'],
                template: 'src/index.html',
                filename: 'index.html'
            }
        ),
        new CleanWebpackPlugin(pathsToClean,  cleanOptions),
        new webpack.LoaderOptionsPlugin({
            options: {
                customInterpolateName: (url) => {
                    return url.replace(/src/g, '');
                }
            }
        }),
        new webpack.ProvidePlugin({
            $: 'jquery',
            jQuery: 'jquery',
            'window.$': 'jquery'
        })
    ],

    optimization: {
        splitChunks: {
            minSize: 0,
            name: 'common',
            chunks: 'all'
        }
    },
    
    devServer: {
        compress: true,
        open: true,
        inline: true,
        stats: 'errors-only',
        watchContentBase: true,
        disableHostCheck: true
    }  
};

module.exports = (env, argv) => {

    if (argv.mode === 'development') {
      config.devtool = 'source-map';
      config.output = {
        path: path.resolve(__dirname, "dist/"), 
        filename: "[name].js",
      }
    }
  
    if (argv.mode === 'production') {
      config.output = {
        path: path.resolve(__dirname, "build/"),
        filename: "[name].js",
      }
    }
  
    return config;
};