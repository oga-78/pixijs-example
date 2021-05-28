
// eslint-disable-next-line @typescript-eslint/no-var-requires
const path = require('path');
// eslint-disable-next-line @typescript-eslint/no-var-requires
const HtmlWebpackPlugin = require('html-webpack-plugin');
// eslint-disable-next-line @typescript-eslint/no-var-requires
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
// eslint-disable-next-line @typescript-eslint/no-var-requires
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
// eslint-disable-next-line @typescript-eslint/no-var-requires
const CopyPlugin = require('copy-webpack-plugin');

module.exports = {
    entry: './src/index.ts',
    devtool: 'inline-source-map',
    devServer: {
        host: '0.0.0.0',
        contentBase: 'dist',
        compress: true,
        port: 3000
    },
    output: {
        filename: 'bundle-[hash].js',
        path: path.resolve(__dirname, 'dist'),
        clean: true
    },
    resolve: {
        extensions: ['.tsx', '.ts', '.js'],
    },
    optimization: {
        minimize: true,
        minimizer: [
            new CssMinimizerPlugin(),
        ],
    },
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                use: 'ts-loader',
                exclude: /node_modules/,
            }, {
                test: /.(s*)css$/,
                use: [
                    MiniCssExtractPlugin.loader,
                    'css-loader?url=false',
                    'sass-loader',
                ]
            },
            {
                test: /\.(png|svg|jpg|jpeg|gif)$/i,
                type: 'asset/resource',
            },
            {
                test: /\.(woff|woff2|eot|ttf|otf)$/i,
                type: 'asset/resource',
            },
        ],
    },
    plugins: [
        new HtmlWebpackPlugin({
            title: 'Pixits - Example',
        }),
        new MiniCssExtractPlugin({
            filename: 'style-[hash].css'
        }),
        new CopyPlugin({
            patterns: [
                {
                    from: 'assets/**/*',
                    to: './',
                },
                {
                    from: './favicon.ico',
                    to: './favicon.ico'
                }
            ]
        })
    ],
    mode: 'development'
};

