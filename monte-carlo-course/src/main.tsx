import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
// App.css is imported within App.tsx, which ensures it loads after index.css
import App from './App.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
