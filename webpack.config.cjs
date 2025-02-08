const path = require('path');
const CopyWebpackPlugin = require("copy-webpack-plugin");
const nodeExternals = require("webpack-node-externals");

module.exports = {
    mode: 'production',
    entry: './bin/www',
    output: {
        path: path.join(__dirname, 'dist'),
        publicPath: '/',
        filename: 'index.js',
    },
    externals: [nodeExternals()],

    plugins: [
        new CopyWebpackPlugin({
            patterns: [
                { from: "views", to: "views" },
                { from: "public", to: "public" },
            ],
        }),
    ],
    target: 'node',
}