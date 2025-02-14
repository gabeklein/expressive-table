import { createRoot } from 'react-dom/client';

import { App } from './App';

window.addEventListener("load", () => {
  createRoot(
    document.getElementById('react-root')
  ).render(<App />);
});