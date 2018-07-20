import React from 'react';
import ReactDOM from 'react-dom';
import {Route, Switch} from 'react-router-dom';
import Signup from './signup';
import Login from './Login';
import Editor from './Editor';
import Particles from 'react-particles-js'
import docPortal from './docPortal';
import io from 'socket.io-client';

export default class App extends React.Component {
  constructor() {
    super();
    this.state = {
      connecting: true,
    };
  }

  componentDidMount() {
    console.log("mounted!")
   fetch('http://localhost:3000/login')
    .then(response => response.json())
    .then(json => {
      if (json.success) {
        this.props.history.push('/editor')
      } else {
        this.props.history.push('/login')
      }
    });
    this.socket = io('http://localhost:1337');
    this.socket.on('connect', () => this.setState({ connecting: null }));
    this.socket.on('disconnect', () => this.setState({ connecting: true }));
  }

  render() {
    console.log(this.props.location.pathname);
    return (
      <Switch>
         <Route path="/signup" component={Signup} />
         <Route path="/login" component={Login} />
         <Route path="/editor" component={Editor} />
         <Route path="/docPortal" component={docPortal} />
      </Switch>

    )
  }
}
