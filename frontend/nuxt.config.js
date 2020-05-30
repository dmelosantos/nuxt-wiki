module.exports = {
  mode: 'universal',

  head: {
    title: 'Wiki',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: 'Wiki' },
    ]
  },

  srcDir: 'client/',

  modules: [
    '@nuxt/http',
    '@nuxtjs/vuetify',
    '@nuxtjs/axios',
  ],

  plugins: [{src:'@/plugins/global.js', ssr: false}],

  http: {
    baseURL: 'http://localhost:8081/',
  },

  render: {
    compressor: false,
  },

  vuetify: {
    treeShake: true,
    defaultAssets: {
      font: true,
      icons: 'mdi'
    },
    icons: {
      iconfont: 'mdi',
    }
  }
};
