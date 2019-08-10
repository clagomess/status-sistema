const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const request = require('request');

module.exports = {
    mode: "production",

    entry: {
        "sistema-info": './src/sistema-info.js'
    },

    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: '[name].min.js',
    },

    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                loader: 'babel-loader',
            }
        ]
    },

    plugins: [
        new CleanWebpackPlugin(),
        new CopyWebpackPlugin([
            {from: 'node_modules/jquery/dist/jquery.min.js'},
            {from: 'node_modules/handlebars/dist/handlebars.min.js'},
            {from: 'node_modules/bootstrap/dist/css/bootstrap.min.css'},
            {from: './src/sistema-info.css'},
            {from: './src/proxy.php'},
            {from: './src/config.json'},
        ]),
        new HtmlWebpackPlugin({
            template: "./src/index.html"
        }),
    ],

    devServer: {
        contentBase: path.join(__dirname, 'dist'),
        compress: true,
        port: 3000,
        before: app => {
            app.get('/proxy.php', (req, res) => {
               request.get(req.query.url).pipe(res);
            });
        }
    }
};