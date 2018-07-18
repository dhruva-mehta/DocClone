import React from 'react';
import TextField from '@material-ui/core/TextField';
import 'isomorphic-fetch';
import PropTypes from 'prop-types';
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

export default class Signup extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '',
      email: '',
      repeat: '',
    };
  }
// Signup function to send to authentication route
  signup() {
    fetch('http://localhost:3000/signup', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        username: this.state.username,
        password: this.state.password,
        repeat: this.state.repeat,
        email: this.state.email,
      }),
    })
    .then((resp)=>{
      if(resp.status===200){
        console.log("passed!")
        this.props.history.push('/login')
      }
      else{
        throw "The sign up did not work, please try again."
      }
    })
  }

  handleChange(name, event) {
    this.setState({
      [name]: event.target.value,
    });
  }

  toLogin(){
    this.props.history.push('/login')
  }

  render() {
    const classes = this.props;
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
          id="email"
          label="Email"
          className={classes.textField}
          value={this.state.email}
          onChange={event => this.handleChange('email', event)}
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
        <TextField
          id="repeat"
          label="Repeat your password"
          className={classes.textField}
          value={this.state.repeat}
          onChange={event => this.handleChange('repeat', event)}
          margin="normal"
        />
        <br />
        <button onClick={() => this.signup()}>Submit</button>
        <button onClick={() => this.toLogin()}>Back to Login</button>
      </form>
    );
  }
}

Signup.propTypes = {
  classes: PropTypes.object.isRequired,
};

// export default withStyles(styles)(Signup);
