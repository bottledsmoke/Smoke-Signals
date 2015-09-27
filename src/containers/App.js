import React, { Component } from 'react';
import { connect } from 'react-redux';
import { sayHello } from '../actions/actions';
import HelloWorld from '../components/helloWorld';


class App extends Component {
  render() {
    const { dispatch, hello } = this.props;
    return (
      <HelloWorld text={ hello }
                  onSayHello={ text =>
                    dispatch(sayHello(text)) }/>
    );
  }
}

function stateToProps(state) {
  return {
    hello: state.greeting.text
  };
}

export default connect(stateToProps)(App);
