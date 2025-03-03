import jsx from '@expressive/vite-plugin';
import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';

export default defineConfig({
  root: 'dev',
  plugins: [
    jsx(),
    react({
      jsxImportSource: '@expressive/react',
      jsxRuntime: 'automatic'
    })
  ]
})