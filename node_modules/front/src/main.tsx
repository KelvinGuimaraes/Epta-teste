/* ---------- main.tsx ---------- */
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import './index.css';

/* 1) habilita dark se usuário preferir */
if (
  window.matchMedia('(prefers-color-scheme: dark)').matches &&
  !localStorage.getItem('theme')
) {
  document.body.classList.add('dark');
}

/* 2) aplica tema salvo */
const stored = localStorage.getItem('theme');
if (stored === 'dark') document.body.classList.add('dark');
if (stored === 'light') document.body.classList.remove('dark');

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);

// utils/theme.ts
export function toggleTheme() {
  const dark = document.body.classList.toggle('dark');
  localStorage.setItem('theme', dark ? 'dark' : 'light');
}
