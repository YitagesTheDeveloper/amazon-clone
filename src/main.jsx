import { StrictMode } from 'react'
import React from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import DataProvider from './components/DataProvider/DataProvider.jsx'
import {initialState,reducer} from './Utility/reducer.js'

createRoot(document.getElementById('root')).render(
  // <React>
    <DataProvider reducer={reducer} initialState={initialState}>
      <App />
    </DataProvider>
  // </React>
)
