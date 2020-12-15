import scss from 'rollup-plugin-scss'
import typescript from '@rollup/plugin-typescript';
import pkg from './package.json';

export default [{
  input: 'src/emails-input.ts',
  output: {
    name: 'EmailsInput',
    file: pkg.browser,
    format: 'umd'
  },
  plugins: [
    scss({
      output: 'dist/styles.css',
    }),
    typescript()
  ]
}, {
  input: 'src/emails-input.ts',
  output: [
    { file: pkg.main, format: 'cjs' },
    { file: pkg.module, format: 'es' }
  ],
  plugins: [
    scss({
      output: 'dist/styles.css',
    }),
    typescript()
  ]
}];
