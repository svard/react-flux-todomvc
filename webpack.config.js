var path = require('path');

module.exports = {
    entry: path.resolve(__dirname, "js/app.jsx"),
    output: {
        path: path.resolve(__dirname, "build"),
        filename: "bundle.js",
        publicPath: "http://localhost:8090/build"
    },
    module: {
        loaders: [
            {
                test: /\.jsx$/,
                exclude: /node_modules/,
                loader: 'babel-loader'
            },
            {
                test: /\.js$/,
                exclude: /node_modules/,
                loader: 'babel-loader'
            }            
        ]
    },
    resolve: {
        extensions: ['', '.js', '.jsx']
    }
}