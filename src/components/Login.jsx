import React from 'react';
import TextField from '@material-ui/core/TextField';
import 'isomorphic-fetch';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router';
// import { withStyles } from '@material-ui/core/styles';
//
// const styles = theme => ({
//   container: {
//     display: 'flex',
//     flexWrap: 'wrap',
//   },
//   textField: {
//     marginLeft: theme.spacing.unit,
//     marginRight: theme.spacing.unit,
//     width: 200,
//   },
//   menu: {
//     width: 200,
//   },
// });

export default class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '',
      loggedin: false,
      register: false,
    };
  }

  login() {
    fetch('http://localhost:3000/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        username: this.state.username,
        password: this.state.password
      }),
    })
    .then(resp => {
      if (resp.status === 200)
        this.setState({loggedin: true})
      else {
        console.log("Theres an Error!:", resp.statusText)
      }
    })
    .catch(err => {console.log(err)})
  }

  handleChange(name, event) {
    console.log("username: " + this.state.username)
    console.log("password: " + this.state.password)
    this.setState({
      [name]: event.target.value,
    });
  }

  toSignUp(){
    this.props.history.push('/signup')
  }

  render() {
    const classes = this.props;
    if (this.state.loggedin){
      this.props.history.push({
             pathname:"/docPortal",
             state:{
                 name:this.state.username //access with: this.props.location.state.name
              }
            });
    }
    else if (this.state.register) {
      return <Redirect to='/signup'/>
    }
    return (
      <form noValidate autoComplete="off" >
        <TextField
          id="name"
          label="Name"
          className={classes.textField}
          value={this.state.username}
          onChange={event => this.handleChange('username', event)}
          margin="normal"
        />
        <TextField
          id="password"
          label="Password"
          className={classes.textField}
          value={this.state.password}
          onChange={event => this.handleChange('password', event)}
          margin="normal"
        />
        <br />
        <button onClick={() => this.login()}>Login!</button>
        <button onClick={()=>this.toSignUp()}>Register!</button>
      </form>
    );
  }
}

Login.propTypes = {
  classes: PropTypes.object.isRequired,
};

// export default withStyles(styles)(Signup);
