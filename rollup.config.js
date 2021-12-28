import babel from '@rollup/plugin-babel';
import commonjs from '@rollup/plugin-commonjs';
import resolve from 'rollup-plugin-node-resolve';
import typescript from 'rollup-plugin-typescript2';

export default  {
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
  external: [
    '@expressive/mvc',
    '@expressive/css',
    'react'
  ],
  plugins: [
    babel({
      presets: ['@expressive/react'],
      plugins: [
        '@babel/transform-typescript',
        '@babel/plugin-proposal-class-properties'
      ],
      babelHelpers: "bundled"
    }),
    resolve({
      extensions: ['.js', '.jsx', '.ts', '.tsx']
    }),
    commonjs(),
    typescript()
  ]
}