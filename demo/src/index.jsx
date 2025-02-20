import { createRoot } from 'react-dom/client';

import { App } from './App';
import Demo from './Table';

window.addEventListener("load", () => {
  createRoot(
    document.getElementById('react-root')
  ).render(<Demo />);
});