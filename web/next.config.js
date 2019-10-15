const { parsed: localEnv } = require('dotenv').config()
const webpack = require('webpack')

module.exports = {
  exportPathMap: function() {
    return {
      '/': { page: '/' }
    };
  },
  webpack: function(config) {
    config.plugins.push(new webpack.EnvironmentPlugin(localEnv))

    return config
  }
};
