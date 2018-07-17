import React from 'react';
import ReactDOM from 'react-dom';
import { Route } from 'react-router-dom';
import Signup from './signup';
import Login from './Login';
import Editor from './Editor';

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  componentDidMount() {
    fetch('/login')
    .then(response => response.json())
    .then((json) => {
      if (json.success) {
        this.props.history.push('/editor');
      } else {
        this.props.history.push('/signup');
      }
    });
  }

  render() {
    return (
      <div>
        <Route path="/signup" component={Signup} />
        <Route path="/login" component={Login} />
        <Route path="/editor" component={Editor} />
      </div>
    );
  }
}
