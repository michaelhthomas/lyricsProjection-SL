module.exports = {
  transpileDependencies: [
    'vuetify'
  ],
  chainWebpack: config => {
    config.module
      .rule("i18n")
      .resourceQuery(/blockType=i18n/)
      .type('javascript/auto')
      .use("i18n")
        .loader("@kazupon/vue-i18n-loader")
        .end()
      .use('yaml')
        .loader('yaml-loader')
        .end();
      config.module
        .rule("yaml")
          .test(/\.ya?ml$/)
          .use('json-loader')
            .loader('json-loader')
          .end()
          .use("yaml-loader")
            .loader('yaml-loader')
          .end();
  }
}
