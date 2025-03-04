import jsx from '@expressive/vite-plugin';
import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';

export default defineConfig(({ command }) => {
  const plugins = [
    jsx(),
    react({
      jsxImportSource: '@expressive/react',
      jsxRuntime: 'automatic'
    })
  ];

  if (command != 'build')
    return {
      plugins,
      root: 'dev'
    };

  return {
    plugins,
    build: {
      lib: {
        entry: __dirname + '/src/index.ts',
        formats: ['es'],
        fileName: () => 'index.js'
      },
      rollupOptions: {
        external: (id) => /^[^./]/.test(id),
        output: {
          assetFileNames: 'assets/[name][extname]'
        }
      },
      cssCodeSplit: true,
      outDir: 'dist'
    }
  };
});