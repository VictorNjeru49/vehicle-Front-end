import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { PersistGate } from 'redux-persist/integration/react'
import { persistentStore } from './app/store.ts'
// Render the root component into the DOM

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <PersistGate loading={null} persistor={persistentStore}>
   <App />
   </PersistGate>
  </React.StrictMode>,
  
)
