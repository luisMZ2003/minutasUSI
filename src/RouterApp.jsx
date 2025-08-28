import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import App from '@/App';
import UserMinutas from '@/pages/UserMinutas.jsx';

const RouterApp = () => (
  <BrowserRouter>
    <Routes>
  <Route path="/" element={<App />} />
  <Route path="/login" element={<App />} />
  <Route path="/minutas" element={<UserMinutas />} />
  <Route path="/create-minuta" element={<App />} />
  <Route path="/edit-minuta/:id" element={<App />} />
    </Routes>
  </BrowserRouter>
);

export default RouterApp;
