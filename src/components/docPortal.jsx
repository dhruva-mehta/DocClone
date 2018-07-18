import React from 'react';
import PropTypes from 'prop-types';
import TextField from '@material-ui/core/TextField';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';

export default class docPortal extends React.Component{
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      newDocName:"",
    };
  }

  handleChange(name, event) {
    this.setState({
      [name]: event.target.value,
    });
  }

  newDoc(){
    if(this.state.newDocName){

    }
  }

  render(){
    const classes = this.props;
    return (
      <div className={classes.root}>
        <AppBar position="static">
          <Toolbar variant="dense">
            <IconButton className={classes.menuButton} color="inherit" aria-label="Menu">
              <MenuIcon />
            </IconButton>
            <Typography variant="title" color="inherit">
              Logged in as: {this.state.username}
            </Typography>
          </Toolbar>
        </AppBar>
        <TextField
          id="newDoc"
          label="newDoc"
          className={classes.textField}
          value={this.state.newDocName}
          onChange={event => this.handleChange('newDocName', event)}
          margin="normal"
        />
        <button onClick={() => this.newDoc()}>Create New Doc!</button>
      </div>
    )
  }

}

docPortal.propTypes = {
  classes: PropTypes.object.isRequired,
};
