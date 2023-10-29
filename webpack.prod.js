const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const ESLintPlugin = require('eslint-webpack-plugin');

module.exports = {
    mode: 'production',
    // 1
    // Use the src/index.js file as entry point to bundle it.
    // If the src/index.js file imports other JS files,
    // bundle them as well
    entry: path.resolve(__dirname, './src/index.js'),
    // 2
    // The bundles source code files shall result in a bundle.js file
    // in the /dist folder
    output: {
        path: path.resolve(__dirname, './dist'),
        filename: 'bundle.js'//,
        //libraryTarget: 'window',
        //library: 'lib'
    },
    // 3
    // The /dist folder will be used to serve our application
    // to the browser
    devServer: {
        static: path.resolve(__dirname, './dist'),
    },
    // 4
    // Add plugins for webpack here
    plugins: [
        //new ESLintPlugin(options),
        new CleanWebpackPlugin,
        new HtmlWebpackPlugin({
            inject: false,
            title: "Basic Webpack Setup",
            filename: "index.html",
            template: path.resolve(__dirname, './src/index.html'),
        }),
        new HtmlWebpackPlugin({
            inject: false,
            //title: "Basic Webpack Setup",
            filename: 'about.html',
            template: path.resolve(__dirname, './src/html/about.html'),
        }),
        new HtmlWebpackPlugin({
            inject: false,
            //title: "Basic Webpack Setup",
            filename: 'cart.html',
            template: path.resolve(__dirname, './src/html/cart.html'),
        }),
        new HtmlWebpackPlugin({
            inject: false,
            //title: "Basic Webpack Setup",
            filename: 'formsValidation.html',
            template: path.resolve(__dirname, './src/html/formsValidation.html'),
        })
    ],
    // 5
    // Integrate Babel in the build process
    // Define which files to use the loader
    module: {
        // configuration regarding modules
        rules: [
            {
                test: /\.(js)$/,
                exclude: /node_modules/, // files to exclude
                use: ['babel-loader'],
            },
            // CSS and SASS
            {
                test: /\.(scss|css)$/,  // load files that end with scss and css
                use: [
                    'style-loader',
                    'css-loader',
                    'sass-loader',
                ],
            },
            //{
            //    test: /\.(html)$/i,
            //    use: 'html-loader',
            //}
        ]
    },
    resolve: {
        // options for resolving module requests
        extensions: ['*', '.js', '.css', '.html']  // files to load
    }
};