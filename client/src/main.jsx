import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import StoreContextProvider from './context/StoreContext.jsx'
//import './index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <StoreContextProvider>
      <App />
    </StoreContextProvider>
  </React.StrictMode>,
)
