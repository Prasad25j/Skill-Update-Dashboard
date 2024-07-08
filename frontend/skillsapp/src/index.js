import React, { useState } from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './screens/App/App';
import reportWebVitals from './reportWebVitals';
import { AppCtx } from './ctx';
function Main(){
  const [ctx ,setctx]=useState({'Emp_id':""})
  const ctxobj={ctx,setctx}
  return (
    <AppCtx.Provider value={ctxobj}>
    <React.StrictMode>
      <App />
    </React.StrictMode>
    </AppCtx.Provider>
  )
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Main />
);



// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
