import React from 'react';
import ReactDOM from 'react-dom';
import { HashRouter as Router, Route } from 'react-router-dom';
import App from './app';

class Root extends React.Component {
  constructor() {
    super();
    this.state = {}
  }

  render() {
    return (
      <Router>
        <Route path="/" component={App}/>
      </Router>
    )
  }
}
export default Root
