import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { insertBlock, removeBlock } from '../actions/post-actions';
import BlockList from '../components/BlockList';
import Footer from '../components/Footer';

class App extends Component {
  render() {
    const { dispatch, blocks } = this.props;
    return (
      <div>
        <BlockList
            blocks={blocks}
            handleInsert={(text = 'foo', blockType = 'A', index) =>
              dispatch(insertBlock(text, blockType, index))}
            handleMove={(index) =>
              console.log(index)}
            handleRemove={(id) =>
              dispatch(removeBlock(id))}
        />
        <Footer
            handleAddBlock={(text, blockType) =>
              dispatch(insertBlock(text, blockType, blocks.length))}
        />
      </div>
    );
  }
}

function stateToProps(state) {
  return {
    blocks: state.blocks
  };
}

App.propTypes = {
  blocks: PropTypes.arrayOf(PropTypes.shape({
    block: PropTypes.string.isRequired,
    id: PropTypes.string.isRequired
  }).isRequired).isRequired,
  dispatch: PropTypes.func.isRequired
};

export default connect(stateToProps)(App);
