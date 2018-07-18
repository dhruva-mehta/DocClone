import React, { Component } from 'react';

const fonts = ['Times New Roman', 'Arial', 'Helvetica', 'Courier', 'Verdana', 'Tahoma'];
export default class Style extends Component {
  constructor() {
    super();
    this.state = {
      showMenu: false,
      fontStyle: 'Times New Roman',
    };
    this.dropClick = this.dropClick.bind(this);
    this.fontClick = this.fontClick.bind(this);
  }
  dropClick() {
    this.setState({
      showMenu: !this.state.showMenu,
    });
  }
  fontClick(item) {
    this.setState({
      showMenu: !this.state.showMenu,
      fontStyle: item,
    });
    console.log(this.state.fontSize)
  }
  render() {
    return (
      <div>
        {this.state.showMenu ?
          fonts.map(item => <button key={item} onClick={this.fontClick(item)}>{item}</button>)
          :
          <button onClick={this.dropClick}>
            {this.state.fontStyle}
          </button>}
      </div>
    );
  }
}
