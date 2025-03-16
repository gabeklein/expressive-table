import { createRoot } from 'react-dom/client';

import Grid from './Grid';

window.addEventListener("load", () => {
  createRoot(document.getElementById('root')).render(<Grid />);
});