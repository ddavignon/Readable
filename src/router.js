import React, { Component } from 'react';
import { BrowserRouter } from 'react-router-dom';
import App from './components/App';

class Router extends Component {
  render() {
    return (
      <BrowserRouter>
        <App />
      </BrowserRouter>
    );
  }
}

export default Router;