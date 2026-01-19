import React from 'react';
import ReactDOM from 'react-dom/client'; //DOM przekształca kod HTML w strukturę drzewa obiektów
import App from './App.jsx';
import './styles/simple.css';

//utworzenie kontener reacta w root index.html
ReactDOM.createRoot(document.getElementById('root')).render(
  //włożenie komponentu <App /> do #root i uruchomienie aplikacji
  <React.StrictMode>
    <App />
  </React.StrictMode>
);