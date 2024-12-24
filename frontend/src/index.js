import React from 'react';
import ReactDOM from 'react-dom/client'; // Use this import for React 18
import { Provider } from 'react-redux';
import store from './store/store';  // Ensure the path is correct
import App from './App';

// React 18+ rendering with createRoot
const root = ReactDOM.createRoot(document.getElementById('root')); // Create the root
root.render(
  <Provider store={store}>
    <App />
  </Provider>
);
