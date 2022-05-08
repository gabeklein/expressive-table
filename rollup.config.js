import babel from '@rollup/plugin-babel';
import commonjs from '@rollup/plugin-commonjs';
import resolve from 'rollup-plugin-node-resolve';
import typescript from 'rollup-plugin-typescript2';
import dts from 'rollup-plugin-dts'

import { dependencies, name } from './package.json';

export default  [
  {
    input: 'src/index.ts',
    output: [
      {
        file: 'lib/index.js',
        format: 'cjs',
        exports: 'named',
        sourcemap: true
      },
      {
        file: 'lib/index.esm.js',
        format: 'esm',
        sourcemap: true
      }
    ],
    external: Object.keys(dependencies),
    plugins: [
      babel({
        presets: [
          ['@expressive/react', { module: name }]
        ],
        babelHelpers: "bundled"
      }),
      resolve({
        extensions: ['.js', '.jsx', '.ts', '.tsx']
      }),
      commonjs(),
      typescript()
    ]
  },
  {
    input: './src/index.ts',
    output: [{
      file: 'lib/index.d.ts',
      format: 'es'
    }],
    plugins: [
      dts()
    ]
  },
]