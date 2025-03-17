import { createRoot } from 'react-dom/client';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';

import Table from './Table';
import Virtual from './Virtual';
import Lazy from './Lazy';

window.addEventListener("load", () => {
  createRoot(document.getElementById('root')).render(
    <BrowserRouter>
      <Routes>
        <Route path="/table" Component={Table} />
        <Route path="/virtual" Component={Virtual} />
        <Route path="/lazy" Component={Lazy} />
        <Route path="*" element={<Navigate to="/virtual" />} />
      </Routes>
    </BrowserRouter>
  );
});