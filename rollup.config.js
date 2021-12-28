import babel from '@rollup/plugin-babel';
import commonjs from '@rollup/plugin-commonjs';
import resolve from 'rollup-plugin-node-resolve';

const extensions = ['.js', '.jsx', '.ts', '.tsx'];

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
  external: ['@expressive/mvc', 'react' ],
  plugins: [
    babel({
      extensions,
      presets: ['@expressive/react'],
      plugins: ['@babel/transform-typescript'],
      babelHelpers: "bundled"
    }),
    resolve({
      extensions
    }),
    commonjs()
  ]
}