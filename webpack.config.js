var path = require('path'),
    webpack = require('webpack');

var envPlugin = new webpack.DefinePlugin({
    'process.env': {NODE_ENV:'"production"'},
    __DEV__: !process.env.BUILD_RELEASE
});

var plugins = [envPlugin];

if(process.env.BUILD_RELEASE) {
    plugins.push(new webpack.optimize.DedupePlugin());
    plugins.push(new webpack.optimize.UglifyJsPlugin([]));
} else {
    plugins.push(new webpack.HotModuleReplacementPlugin());
    plugins.push(new webpack.NoErrorsPlugin());
}

module.exports = {
    entry: './src/index.js',
    output: {
        path: path.resolve(__dirname, 'build'),
        publicPath: '/',
        filename: 'bundle.js'
    },
    module: {
        loaders: [
            {
                test: /\.jsx?$/,
                exclude: /(node_modules)/,
                loaders: ['react-hot', 'babel']
            }
        ]
    },
    plugins: plugins
};
