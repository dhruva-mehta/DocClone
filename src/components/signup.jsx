import React from 'react';
// import 'typeface-roboto';
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
      name: '',
      password: '',
      email: '',
      repeat: '',
    };
  }
// Signup function to send to authentication route
  signup() {
    fetch('/signup', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name: this.state.name,
        password: this.state.password,
        repeat: this.state.repeat,
        email: this.state.email,
      }),
    });
  }

  handleChange(name, event) {
    this.setState({
      [name]: event.target.value,
    });
  }

  render() {
    const classes = this.props;
    return (
      <form noValidate autoComplete="off" >
        <TextField
          id="name"
          label="Name"
          className={classes.textField}
          value={this.state.name}
          onChange={event => this.handleChange('name', event)}
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
        <button onClick={() => signup()}>Submit</button>
      </form>
    );
  }
}

Signup.propTypes = {
  classes: PropTypes.object.isRequired,
};

// export default withStyles(styles)(Signup);
