import React, { Component, findDOMNode } from 'react';

class HelloWorld extends Component {
  sayHello(e) {
    e.preventDefault();
    if (e.keyCode === 13) {
      const node = findDOMNode(this.refs.helloInput);
      const newHello = node.value.trim();
      this.props.onSayHello(newHello);
      node.value = '';
    }
  }
  render() {
    return (
      <div>
        <h1>{this.props.text}</h1>
        <input ref='helloInput' onKeyUp={e => this.sayHello(e)}/>
      </div>
    );
  }
}

export default HelloWorld;
