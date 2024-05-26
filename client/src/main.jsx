import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import {CssBaseline} from '@mui/material'; 
import {HelmetProvider} from 'react-helmet-async';
import { BrowserRouter } from 'react-router-dom';


ReactDOM.createRoot(document.getElementById('root')).render(
  <BrowserRouter>
      <HelmetProvider>
  <CssBaseline/>
    
    <App />
  </HelmetProvider>
  </BrowserRouter>

)
