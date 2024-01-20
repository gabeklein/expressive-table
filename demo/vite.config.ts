import jsx from '@expressive/vite-plugin-jsx';
import react from '@vitejs/plugin-react';
import Vite from 'vite';

export default <Vite.UserConfig> {
  plugins: [
    react(),
    jsx()
  ]
}