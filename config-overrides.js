const { override, fixBabelImports, addLessLoader } = require('customize-cra')

module.exports = override(
  fixBabelImports('import', {
    libraryName: 'antd',
    libraryDirectory: 'es',
    style: true,
  }),
  addLessLoader({
    javascriptEnabled: true,
    modifyVars: {
      'primary-color': '#F0B429',
      'btn-primary-color': '#8D2B0B',
      'btn-primary-bg': '#F0B429',
    },
  })
)
