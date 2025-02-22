import { createRoot } from 'react-dom/client';

import Demo from './Demo';

window.addEventListener("load", () => {
  createRoot(
    document.getElementById('react-root')
  ).render(<Demo />);
});