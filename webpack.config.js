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
                //tell webpack to use jsx-loader for all *.jsx files
                test: /\.jsx$/,
                loader: 'jsx-loader?insertPragma=React.DOM&harmony'
            }
        ]
    },
    resolve: {
        extensions: ['', '.js', '.jsx']
    }
}