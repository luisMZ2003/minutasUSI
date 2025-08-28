import React from 'react';
import ReactDOM from 'react-dom/client';
import RouterApp from '@/RouterApp';
import '@/index.css';
import { AuthProvider } from '@/contexts/SupabaseAuthContext';
import { Toaster } from '@/components/ui/toaster';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AuthProvider>
  <RouterApp />
      <Toaster />
    </AuthProvider>
  </React.StrictMode>
);