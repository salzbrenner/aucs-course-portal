const { parsed: localEnv } = require('dotenv').config()
const webpack = require('webpack')
const withCSS = require('@zeit/next-css')
// const fetch = require('isomorphic-unfetch');
const API_URL =
    process.env.NODE_ENV === 'production'
        ? process.env.API_PATH_PRODUCTION
        : `http://127.0.0.1:5000/api`;
const axios = require('axios');


module.exports = withCSS({
  exportPathMap: async function() {
    const paths = {
      '/': { page: '/' },
      '/about': { page: '/about' },
    };

    //TODO: switch to isomorphic api
    if (process.env.NODE_ENV === 'production') {
      const res = await axios.get(`${API_URL}/course`);
      const data = res.data;
      // const res = await fetch('http://127.0.0.1:5000/api/course');
      // const data = await res.json();
      const courses = data.map(entry => entry.cid);

      courses.forEach(cid => {
        paths[`/course/${cid}`] = { page: '/course/[cid]' };
      });
    }


    return paths;
  },
  webpack: function(config) {
    config.plugins.push(new webpack.EnvironmentPlugin(localEnv))

    return config
  }

});
