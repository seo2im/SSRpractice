import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'

const initialData = window.__INITIAL_DATA__;
console.log(initialData);
ReactDOM.hydrate(<App firstPage={initialData.page}/>, document.getElementById('root'));