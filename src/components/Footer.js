import React, { findDOMNode, PropTypes } from 'react';

export default class Footer extends React.Component {
  onAddBlock(blockType) {
    const node = findDOMNode(this.refs.input);
    const text = node.value.trim();
    if (text.length > 0) {
      this.props.handleAddBlock(text, blockType);
    }
    node.value = '';
  }
  checkIfReturn(e) {
    if (e.keyCode === 13) {
      const blockType = 'B';
      this.onAddBlock(blockType);
    }
  }
  render() {
    return (
      <div>
        <input
            onKeyUp={e => this.checkIfReturn(e)}
            ref="input"
            type="text"
        />
        <button onClick={() => this.onAddBlock('A')}>{'Add Block A'}</button>
        <button onClick={() => this.onAddBlock('B')}>{'Add Block B'}</button>
      </div>
    );
  }
}

Footer.propTypes = {
  handleAddBlock: PropTypes.func.isRequired
};
