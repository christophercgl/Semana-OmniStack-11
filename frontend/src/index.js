import React from 'react';
import ReactDOM from 'react-dom';

import App from './App';

// Componente no React é uma função que retorna html

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);
