import React from 'react';
import ReactDOM from 'react-dom';
import {Route, Switch} from 'react-router-dom';
import Signup from './signup';
import Login from './Login';
import Editor from './Editor';

export default class App extends React.Component {
  constructor() {
    super();
    this.state = {}
  }

  componentDidMount() {
   /*fetch('/login')
    .then(response => response.json())
    .then(json => {
      if (json.success) {
        this.props.history.push('/editor')
      } else {
        this.props.history.push('/signup')
      }
    })*/
  }

  render() {
    console.log(this.props.location.pathname);
    return (
      <Switch>
         <Route path="/" component={Signup} />
         <Route path="/login" component={Login} />
         <Route path="/editor" component={Editor} />
      </Switch>

    )
  }
}
