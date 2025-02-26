import jsx from '@expressive/vite-plugin-jsx';
import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';

export default defineConfig({
  root: 'test',
  plugins: [
    react(),
    jsx()
  ]
})