
module.exports = {
  images: {
    domains: ['cdn.sanity.io'],
  },
  async redirects() {
    return [
      // { source: "/projects/:slug", destination: "/", permanent: false },
    ];
  },
}
