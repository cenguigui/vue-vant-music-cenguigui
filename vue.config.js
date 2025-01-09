const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  chainWebpack: config => {
    config.plugin('define').tap(definitions => {
      definitions[0]['__VUE_PROD_HYDRATION_MISMATCH_DETAILS__'] = true;
      return definitions;
    });
  },
  publicPath:'./'
})
// module.exports = {
//   chainWebpack: config => {
//     config.plugin('define').tap(definitions => {
//       definitions[0]['__VUE_PROD_HYDRATION_MISMATCH_DETAILS__'] = true;
//       return definitions;
//     });
//   }
// };