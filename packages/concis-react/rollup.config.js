import typescript from 'rollup-plugin-typescript2';
import less from 'rollup-plugin-less';
import clear from 'rollup-plugin-clear';
import resolve from 'rollup-plugin-node-resolve';
import commonjs from 'rollup-plugin-commonjs';
import babel from 'rollup-plugin-babel';
import { terser } from 'rollup-plugin-terser';
import { uglify } from 'rollup-plugin-uglify';
import copy from 'rollup-plugin-copy';

export default {
  input: ['./src/index.ts'],
  output: [
    {
      file: 'web-react/cjs.js',
      format: 'cjs',
      name: 'cjs.js',
    },
    {
      file: 'web-react/umd.js',
      format: 'umd',
      name: 'umd.js',
    },
    {
      file: 'web-react/index.js',
      format: 'es',
      name: 'index.js',
    },
  ],
  plugins: [
    typescript(), // 会自动读取 文件tsconfig.json配置
    less({ output: './web-react/style/index.css' }),
    clear({
      targets: ['web-react'],
    }),
    resolve(),
    commonjs(),
    babel({
      exclude: 'node_modules/**',
      runtimeHelpers: true,
    }),
    terser(),
    uglify(),
    copy({
      targets: [
        { src: '../../scripts/globalStyle/compiled-colors.less', dest: 'web-react/style' }
      ],
    }),
  ],
  external: ['react', 'react-dom'],
};
