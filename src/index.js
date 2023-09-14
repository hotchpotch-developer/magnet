import React from 'react';
import ReactDOM from 'react-dom/client';
import 'bootstrap/dist/js/bootstrap.min.js';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter as Router } from 'react-router-dom';
import './index.css';
import Routing from './components/Routing';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Router>
      <Routing />
    </Router>
    <div className="position-fixed top-0 end-0 toast-wrapper" style={{zIndex:2222}} id="toastContainer"></div>
  </React.StrictMode>
);
reportWebVitals();
