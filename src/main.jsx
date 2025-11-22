import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'

const clientId = import.meta.env.VITE_THIRDWEB_CLIENT_ID || ''

if (!clientId) {
  console.warn('VITE_THIRDWEB_CLIENT_ID is not set. Wallet connection may not work properly.');
}

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
