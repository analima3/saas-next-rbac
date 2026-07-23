import globals from 'globals'
import nodePlugin from 'slint-plugin-n'

import baseConfig from './base.js'

const nodeConfig = [
  ...baseConfig,
  {
    files: ['**/*.{js,ts}'],
    plugins: {
      n: nodePlugin,
    },
    languageOptions: {
      globals: {
        ...globals.node,
      },
    },
    rules: {
      ...nodePlugin.configs['flat/recommended'].rules,
    },
  },
]

export default nodeConfig
