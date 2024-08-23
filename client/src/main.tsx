import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.tsx'

createRoot(document.getElementById('panelSend')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
