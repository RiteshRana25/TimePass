import React from 'react';  // Importing React library
import ReactDOM from 'react-dom/client';  // For rendering React component in DOM
import './index.css';  // Importing the global CSS
import App from './App';  // Importing the main App component
import { PornProvider } from './PornContext';  // Importing the PornProvider context

// Creating the root of the React app
const root = ReactDOM.createRoot(document.getElementById('root'));

// Rendering the App component inside the PornProvider to make the context available
root.render(
  <PornProvider> 
    <App />
  </PornProvider>
);
