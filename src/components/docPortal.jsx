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


export default class docPortal extends React.Component{
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      newDocName:"",
      docObjList:[]
    };
  }

  handleChange(name, event) {
    this.setState({
      [name]: event.target.value,
    });
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
      this.setState({username: json.user.username}))
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
      .then(resp=> {if (resp.status === 200)
        console.log("it worked?")
        else{
          console.log("Error....")
        }
      })
    }
  }

  toEditor(){
    this.props.history.push('/editor')
    console.log(this.props.history)
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
        <Typography variant="title" color="inherit">
          Your Documents!
        </Typography>
        <List>
          {this.state.docObjList.map(doc=>
            <ListItem button onClick={()=>this.toEditor()}><ListItemText primary={doc.docName}/></ListItem>
          )}
        </List>

      </div>
    )
  }

}

docPortal.propTypes = {
  classes: PropTypes.object.isRequired,
};
