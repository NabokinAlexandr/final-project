// для того, чтобы прописать конфиг аутпут (результат работы вебпака) и сложть в определенном месте
const path = require('path');
//Забрал из библиотеки вебпак сам вебпак
const webpack = require('webpack');
// кладет преобразоанные из сассов цсс в нужное место(финальный цсс)
const ExtractCssChunks = require("extract-css-chunks-webpack-plugin");
// после отработки вебпака создается новая папка билд/дист. Чтобы она самоудалялась пред тем, как повится новая при след
// обработке вебпаком, нужен этот плагин
const CleanWebpackPlugin = require('clean-webpack-plugin'); 
// берет хтмл и кладет в нужную папку
const HtmlWebpackPlugin = require('html-webpack-plugin');

let pathsToClean = ['dist', 'build']

let cleanOptions = {
    root: process.cwd(),
    verbose: true,
    dry: false
}

const config = {
    target: "web",
    // файлы. из которых создается финальные файлы, преобразованные вебпаком
    entry: {
        "main": ["./src/main.js", "./src/assets/main.scss"]
    }, 
    resolve: {
        extensions: [".js", ".scss", ".css"]
    },
    // набор правил, по которым будут резолвиться файлы жс, цсс и картинки и т д
    module: {
        rules: [
            {
                // преобразование джс
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
                // преобразование цсс
                test: /\.(sass|scss)$/,
                use: [ExtractCssChunks.loader, "css-loader", "postcss-loader", "sass-loader"],
            },
            {
                // проверка ошибок. При запуске вебпака в терминале отобразятся ошибки и меат, где они допущені
                test: /\.js$/,
                enforce: "pre",
                exclude: /node_modules/,
                loader: "eslint-loader"
            },
            {
                // для переноса картинок в дист/билд и сжатия по лимиту
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
        // При отработке вебпака все урлі в картинках, видео и тд заменится на срц, 
        // т.к. папка будет новая где они будут лежать
        new webpack.LoaderOptionsPlugin({
            options: {
                customInterpolateName: (url) => {
                    return url.replace(/src/g, '');
                }
            }
        })
    ],

    optimization: {
        splitChunks: {
            minSize: 0,
            name: 'common',
            chunks: 'all'
        }
    },
    // вебпак отрабатвает при каждом сохранении кода
    devServer: {
        compress: true,
        open: true,
        inline: true,
        stats: 'errors-only',
        watchContentBase: true,
        contentBase: path.join(__dirname, '/src'),
        port: 3000
    }  
};
// Функция выбора дев или прод режима
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