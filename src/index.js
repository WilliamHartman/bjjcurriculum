import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { Auth0Provider } from "@auth0/auth0-react";

ReactDOM.render(
  <React.StrictMode>
    <Auth0Provider
      domain="williamhartman.auth0.com"
      clientId="wSwyIbYH3MbLvqefK9ojiFugl78cOU1T"
<<<<<<< HEAD
      redirectUri={process.env.REACT_APP_AUTH0_REDIRECT}
=======
      redirectUri={'https://bjjcurr.com'}
>>>>>>> 5efb0aebe00282f5b4722b847159f025829a31e7
    >
      <App />
    </Auth0Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
