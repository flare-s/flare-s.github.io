const HtmlWebPackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const PurgecssPlugin = require('purgecss-webpack-plugin');
const path = require("path");
const glob = require('glob');

const PATHS = {
    src: path.join(__dirname, 'src')
}

module.exports = {
    entry: {
        index:  './src/js/script.js'
    },  
    output: {
        filename: 'js/[name]-[contentHash].bundle.js',
        path: path.join(__dirname, 'dist'),
        publicPath: ""
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: [
                            [
                                '@babel/preset-env',
                                {
                                    useBuiltIns: "usage",
                                    corejs: '3',
                                }
                            ]
                        ],
                        
                    }
                }
            },
            {
                test: /\.(?:ico|gif|png|jpg|jpeg|svg)$/i,
                type: 'asset',
                generator: {
                    filename: './img/[hash][ext][query]'
                }
            },
            {
                test: /\.html$/,
                use: [
                    {
                        loader: "html-loader",
                    }
                ]
            },
            // {
            //     test: /\.json$/i,
            //     type: 'javascript/auto',
            // },
            {
                test: /\.(sass|scss|css)$/,
                exclude: /node_modules/,
                use: [
                    {
                        loader: MiniCssExtractPlugin.loader,
                        options: {
                            publicPath: "../"
                        }
                    },
                    {
                        loader: "css-loader"
                    },
                    {
                        loader: 'postcss-loader',
                        options: {
                          sourceMap: true,
                          postcssOptions: {
                            config: 'postcss.config.js',
                          }
                        }
                    }
                ]
                    
                
           },
            
        ]
    },
    plugins: [
        new HtmlWebPackPlugin({
            template: "./src/index.html",
            filename: "./index.html",
            chunks: ['index'],  
        }),
        new MiniCssExtractPlugin({
            filename: "css/[name].css",
            chunkFilename: "[id].css",
        }),
        new PurgecssPlugin({
            paths: glob.sync(`${PATHS.src}/**/*`,  { nodir: true }),
        })

    ],
    devServer: {
        static: path.join(__dirname, 'dist'),
        port: 9000,
    }
};
