import { createRoot } from 'react-dom/client';

import Table from './Table';

window.addEventListener("load", () => {
  createRoot(document.getElementById('root')).render(<Table />);
});