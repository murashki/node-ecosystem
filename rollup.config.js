import typescript from '@rollup/plugin-typescript';

export default [
  {
    input: {
      index: './src/index.ts',
    },
    output: [
      {
        chunkFileNames: 'cjs/[name]-[hash].cjs',
        dir: './dist',
        entryFileNames: 'cjs/[name].cjs',
        format: 'cjs',
      },
      {
        chunkFileNames: 'esm/[name]-[hash].js',
        dir: './dist',
        entryFileNames: 'esm/[name].js',
        format: 'esm',
      },
    ],
    plugins: [
      typescript(
        {
          tsconfig: './tsconfig.json',
        },
      ),
    ],
  },
];
