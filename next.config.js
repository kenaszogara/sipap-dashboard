module.exports = {
  serverRuntimeConfig: {
    // Will only be available on the server side
  },
  publicRuntimeConfig: {
    // Will be available on both server and client
    API_URL: process.env.REACT_APP_API_URL,
  },
  images: {
    domains: ["159.65.2.14", "localhost"],
  },
};
