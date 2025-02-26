import { createRoot } from 'react-dom/client';

import Demo from './Demo';

window.addEventListener("load", () => {
  createRoot(document.getElementById('root')).render(<Demo />);
});