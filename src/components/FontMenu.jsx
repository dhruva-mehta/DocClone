import React, { Component } from 'react';

const numbers = ['8px', '10px', '12px', '14px', '16px', '18px', '20px', '22px', '24px'];
export default class Size extends Component {
  constructor() {
    super();
    this.state = {
      showMenu: false,
      fontSize: '12px',
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
      fontSize: item,
    });
    console.log(this.state.fontSize)
  }
  render() {
    return (
      <div>
        <
        {this.state.showMenu ?
          numbers.map(item => <button key={item} onClick={this.fontClick(item)}>{item}</button>)
          :
          <button onClick={this.dropClick}>
            {this.state.fontSize}
          </button>}
      </div>
    );
  }
}
