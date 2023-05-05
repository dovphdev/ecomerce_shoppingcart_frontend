import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css'

//Redux
import { Provider } from 'react-redux';
import { legacy_createStore as createStore } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import rootReducer from './components/reducers';


// Route
import { BrowserRouter, } from 'react-router-dom';


//Antd
// import 'antd/dist/antd.css'; // or 'antd/dist/antd.less'
import 'antd/dist/reset.css';
import 'bootstrap/dist/css/bootstrap.min.css';

const store = createStore(rootReducer, composeWithDevTools())


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  // <React.StrictMode>
    <Provider store= {store}>
      <BrowserRouter>

        <App />

      </BrowserRouter>
    </Provider>
  // </React.StrictMode>
);

