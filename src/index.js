import React from 'react'
import ReactDOM from 'react-dom'

import { ThemeProvider } from 'emotion-theming'
import theme from './theme'
// import 'bootstrap/dist/css/bootstrap.min.css'

import { Provider } from 'react-redux'
import configureStore from './store'

import App from './App';
import * as serviceWorker from './serviceWorker';

const store = configureStore()
store.dispatch({
  type: 'GET_DATA_REQUEST'
})
ReactDOM.render((
  <Provider store={store}>
  <ThemeProvider theme={theme}>
  <App />
  </ThemeProvider>
</Provider>
), document.getElementById('root'))

serviceWorker.unregister();
