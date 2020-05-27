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
  ],

  http: {
    baseURL: 'https://api.thedogapi.com/v1/',
  },

  render: {
    compressor: false,
  },

  vuetify: {
    defaultAssets: {
      font: true,
      icons: 'mdi'
    },
    icons: {
      iconfont: 'mdi',
    }
  }
};
