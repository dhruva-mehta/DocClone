import React from 'react';
import PropTypes from 'prop-types';
import TextField from '@material-ui/core/TextField';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import { Link } from 'react-router-dom';

export default class docPortal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: this.props.location.state.name,
      newDocName: '',
      docObjList: [],
    };
  }

  componentDidMount() {
    fetch('http://localhost:3000/doc', {
      credentials: 'same-origin',
    })
    .then(resp => resp.json())
    .then(json =>
    this.setState({ docObjList: json }));
  }
  ange(name, event) {
    this.setState({
      [name]: event.target.value,
    });
  }

  newDoc() {
    if (this.state.newDocName.length !== 0) {
      fetch('http://localhost:3000/doc/create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'same-origin', // <- this is mandatory to deal with cookies
        body: JSON.stringify({
          docName: this.state.newDocName,
        }),
      })
      .then(resp => {
        if (resp.status === 200){
          console.log('it worked?')
        } else {
          console.log('Error....')
        }
      });
    }
  }
  //added function to redirect to editord
openDoc(docId) {

}
  render() {
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
        {/* Griffen's changes to make list appear */}
        <div>
          Document should be here
          {this.state.docObjList.map(doc =>
            (<div><button key={doc.docName} className="docBtn">
              <Link to={{ pathname: '/editor', state: { doc: doc }}}>{doc.docName}</Link></button></div>))}
        </div>
      </div>
    );
  }

}

docPortal.propTypes = {
  classes: PropTypes.object.isRequired,
};
