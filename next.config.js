const {
  PHASE_DEVELOPMENT_SERVER,
  PHASE_PRODUCTION_BUILD,
} = require('next/constants')

const getBuildConfig = (...args) => {
  const path = require('path')
  const withPugins = require('next-compose-plugins')
  const withSCSS = require('@zeit/next-sass')
  const cssOptions = {
    sassLoaderOptions: {
      includePaths: [path.join(process.cwd(), 'src', 'common', 'css')],
    },
  }

  const nextConfig = {}
  return withPugins([[withSCSS, cssOptions]], nextConfig)(...args)
}

module.exports = (phase, ...rest) => {
  const shouldAddBuildConfig =
    phase === PHASE_DEVELOPMENT_SERVER || phase === PHASE_PRODUCTION_BUILD
  return shouldAddBuildConfig ? getBuildConfig(phase, ...rest) : {}
}

module.exports = {
  presets: ['next/babel'],
  plugins: [
    [
      'babel-plugin-module-resolver',
      {
        root: ['.'],
        alias: {
          '@components': './src/components',
          '@containers': './src/containers',
          '@css': './src/css',
          '@store': './src/store',
          '@constants': './src/constants',
          '@services': './src/services',
          '@utils': './src/utils',
          '@theme': './src/theme',
        },
      },
    ],
  ],
}
