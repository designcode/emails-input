import typescript from '@rollup/plugin-typescript';
import scss from 'rollup-plugin-scss'
import pkg from './package.json';

export default [{
  input: 'src/emails-input.ts',
  output: {
    name: 'EmailsInput',
    file: pkg.browser,
    format: 'umd'
  },
  plugins: [
    typescript({
      target: 'es5',
      tsconfig: false // For some reason it doesn't take the tsconfig into account
    }),
    scss({
      output: 'dist/styles.css',
    }),
  ]
}];
