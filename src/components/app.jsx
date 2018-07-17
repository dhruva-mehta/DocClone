import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route } from 'react-router-dom';
import Signup from './Signup';
import Login from './Login';
import Editor from './Editor';

class App extends React.Component {
  constructor() {
    super();
    this.state = {}
  }

  componentDidMount() {
    fetch('/login')
    .then(response => response.json())
    .then(json => {
      if (json.success) {
        this.props.history.push('/editor')
      } else {
        this.props.history.push('/signup')
      }
    })
  }

  render() {
    return (
      <div>
        <Route path="/signup" component={Signup} />
        <Route path="/login" component={Login} />
        <Route path="/editor" component={Editor} />
      </div>
    )
  }
}
