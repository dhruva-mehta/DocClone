import React from 'react';
import PropTypes from 'prop-types';
import TextField from '@material-ui/core/TextField';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Divider from '@material-ui/core/Divider';
<<<<<<< HEAD
import io from 'socket.io';

=======
import _ from 'underscore';
import io from 'socket.io-client';

let socket = io("http://localhost:3000")
>>>>>>> master

export default class docPortal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      newDocName:"",
      docObjList:[],
      shareDoc:"",
      userid:"",
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

  handleChange(name, event) {
    this.setState({
      [name]: event.target.value,
    });
    socket.emit('connected', function())
  }

  componentWillMount(){
    fetch('http://localhost:3000/doc',{
        credentials: 'same-origin',
    })
    .then(resp=>resp.json())
    .then(json=>{
      console.log(json)
    this.setState({docObjList: json})
  })

    fetch('http://localhost:3000/ping',{
      credentials: 'same-origin',
    })
    .then(resp => resp.json())
    .then(json=>
      this.setState({username: json.user.username, userid:json.user._id}))
  }

  newDoc(){
    if(this.state.newDocName.length !== 0){
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

  toEditor(id){
    this.props.history.push({
           pathname:"/editor",
           state:{
               id: id, //access with: this.props.location.state.name
               io: socket //Make this socket???
            }
          });
    console.log(this.props.history)
  }

<<<<<<< HEAD
  render() {
=======
  share(){
    fetch('http://localhost:3000/doc/share', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'same-origin', // <- this is mandatory to deal with cookies
      body: JSON.stringify({
        _id:this.state.shareDoc,
      }),
    })
    .then(resp=>console.log(resp))
  }

  render(){
>>>>>>> master
    const classes = this.props;
    let onlyCreator = [];
    let onlyCollab = [];
     _.each(this.state.docObjList, obj => {
       if(obj.creator===this.state.userid){
         onlyCreator.push(obj)
       }
       else {
         onlyCollab.push(obj)
       }
    })

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
        <Typography variant="title" color="inherit">
          Your Created Documents!
        </Typography>
        <List>
<<<<<<< HEAD
          {this.state.docObjList.map(doc =>
            (<ListItem button key={doc._id} onClick={() => this.toEditor()}>
              <ListItemText primary={doc.docName} /></ListItem>),
=======
          {onlyCreator.map(doc=>
            <ListItem button onClick={()=>this.toEditor(doc._id)}><ListItemText primary={doc.docName}/></ListItem>
>>>>>>> master
          )}
        </List>
        <Typography variant="title" color="inherit">
          Collaborating on these Docs!
        </Typography>
        <List>
          {onlyCollab.map(doc=>
            <ListItem button onClick={()=>this.toEditor(doc._id)}><ListItemText primary={doc.docName}/></ListItem>
          )}
        </List>
        <TextField
          id="shareDoc"
          label="shareDoc"
          className={classes.textField}
          value={this.state.shareDoc}
          onChange={event => this.handleChange('shareDoc', event)}
          margin="normal"
        />
        <button onClick={() => this.share()}>Enter Document ID to get added to a Doc!</button>
      </div>
    );
  }

}

docPortal.propTypes = {
  classes: PropTypes.object.isRequired,
};
