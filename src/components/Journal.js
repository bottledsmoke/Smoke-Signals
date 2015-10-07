import React, { Component, findDOMNode } from 'react';

export default class Journal extends Component {
  constructor() {
    super();
    this.state = {
      blocks: [{
        text: 'Yabba yabba doo doo',
        isEditing: false
      }]
    };
  }
  render() {
    return (
      <div>
        {this.state.blocks.map((block, index) =>
          <Entry
                 handleClick={(i) => this.toggleEditing(i)}
                 handleEdit={(i, text, trimmedText) => this.finishEdit(i, text, trimmedText)}
                 index={index}
                 isEditing={block.isEditing}
                 text={block.text} />
        )}
      </div>
    );
  }
  toggleEditing(index) {
    const toggleBool = this.state.blocks[index].isEditing ? false : true;
    // swap for editing index in the state that stores the index of the current
    // entry being edited instead of storing an isEditing bool on each
    // entry. That gets messy.
    const resetEditing = this.state.blocks.map(block => block.isEditing = false);
    const nextState = [
      ...this.state.blocks.slice(0, index),
      {
        ...this.state.blocks[index],
        isEditing: toggleBool
      },
      ...this.state.blocks.slice(index + 1)
    ];
    this.setState({blocks: nextState});
  }
  finishEdit(index, text, trimmedText) {
    console.log(index, text, trimmedText);
    const nextState = [
      ...this.state.blocks.slice(0, index),
      {
        isEditing: false,
        text: text
      },
      {
        ...this.state.blocks[index],
        text: trimmedText
      },
      ...this.state.blocks.slice(index + 1)
    ];
    console.log(nextState);
    this.setState({blocks: nextState});
  }
}

class Entry extends Component {
  handleKeyUp(e) {
    if (e.keyCode === 13) {
      const node = findDOMNode(this.refs.abba);
      const text = node.value;
      var match = /[\r|\n]{2,}/.exec(text);
      console.log(match);
      if (match) {
        const slicedText = text.trim().slice(0, match.index);
        const remainder = text.trim().slice(match.index + 2);
        this.props.handleEdit(this.props.index, slicedText, remainder);
      }
    }
  }
  render() {
    if (this.props.isEditing) {
      return (
        <textarea
               defaultValue={this.props.text}
               onKeyUp={(e) => this.handleKeyUp(e)}
               ref="abba"
               style={{width: '100%'}}
               type="text"
        />
      );
    } else {
      return (
        <div onClick={this.props.handleClick.bind(null, this.props.index)}>
          <p>
            {this.props.text}
          </p>
        </div>
        );
    }
  }
}
