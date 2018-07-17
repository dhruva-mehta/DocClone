import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route } from 'react-router-dom';
import App from './App';

class Root extends React.Component {
  constructor() {
    super();
    this.state = {}
  }

  render() {
    return (
      <Router>
        <App />
      </Router>
    )
  }
}
