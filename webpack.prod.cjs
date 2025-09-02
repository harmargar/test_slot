const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");
const ESLintPlugin = require("eslint-webpack-plugin");
const HtmlInlineScriptPlugin = require("html-inline-script-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const TerserPlugin = require("terser-webpack-plugin");

const  webpack = require("webpack");
const fs = require("fs");
const path = require("path");

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const pkg = JSON.parse(fs.readFileSync(path.join(__dirname, "package.json"), "utf-8"));

module.exports = () => {
    return {
        mode: "production",

        module: {
            rules: [
                {
                    test: /\.m?(ts|js)x?$/,
                    loader: 'esbuild-loader',
                    options: {
                        target: 'es2015',
                    },
                },
                {
                    test: /\.tsx?$/,
                    use: "ts-loader",
                    exclude: /node_modules/,
                },
            ],
        },

        output: {
            environment: {
                arrowFunction: false,
                bigIntLiteral: false,
                const: false,
                destructuring: false,
                dynamicImport: false,
                forOf: false,
                module: false,
            },
        },

        optimization: {
            minimize: true,
            minimizer: [new TerserPlugin(
                {
                    parallel: 4,
                    extractComments: false,
                    terserOptions: {
                        compress: {
                            drop_console: true,
                        },
                        format: {
                            comments: false,
                            ascii_only: true,
                        },
                    },
                }
            ), new CssMinimizerPlugin()],
        },

        plugins: [
            new HtmlInlineScriptPlugin(),

            new MiniCssExtractPlugin({
                filename: "[name].[contenthash].css",
            }),

            new webpack.DefinePlugin({
                VERSION: JSON.stringify(pkg.version + "-r"),
            }),

            new ESLintPlugin({
                emitError: true,
                emitWarning: true,
                failOnError: true,
                failOnWarning: true,
            }),

            new webpack.ProgressPlugin(),
        ],
    };
};
