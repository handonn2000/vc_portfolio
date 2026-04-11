import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import LunarConfession from './pages/LunarConfession/LunarConfession.tsx'

const isLunarRoute = window.location.pathname === '/nguyet';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    {isLunarRoute ? <LunarConfession /> : <App />}
  </StrictMode>,
)
