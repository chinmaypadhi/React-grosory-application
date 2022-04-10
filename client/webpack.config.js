const HtmlWebpackPlugin = require("html-webpack-plugin");
const CspHtmlWebpackPlugin = require("csp-html-webpack-plugin");

module.exports = {
  // rest of webpack config

  plugins: [
    new HtmlWebpackPlugin(),
    new CspHtmlWebpackPlugin({
      "script-src": "",
      "style-src": "",
      "object-src": "'none'",
      "base-uri": "'self'",
      "script-src": [
        "'unsafe-inline'",
        "'self'",
        "'unsafe-eval'",
        "https://code.jquery.com",
      ],
      "worker-src": ["'self'", "blob:"],
    }),
  ],
};
