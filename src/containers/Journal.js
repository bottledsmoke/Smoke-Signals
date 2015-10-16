import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import * as actions from '../actions/journal-actions';
import { Entry } from '../components/Journal/Journal';

const { setEditingIndex, editBlockText,
        combineBlocks, splitBlocks } = actions;

class Journal extends Component {
  render() {
    const { dispatch, blocks, isBeingEdited } = this.props;
    return (
      <div className="journal-container">
        {blocks.map((block, index) =>
          <Entry
              handleClick={
                (blockId) =>
                  dispatch(setEditingIndex(blockId))
                }
              handleCombine={
                () =>
                  dispatch(combineBlocks())
              }
              handleEdit={
                (text, id) => {
                  console.log(text, id);
                  dispatch(editBlockText(text, id));
                  dispatch(setEditingIndex(''));
                }
                }
              handleSplit={
                ()=>
                  dispatch(splitBlocks())
              }
              id={block.id}
              index={index}
              isBeingEdited={block.id === isBeingEdited}
              key={block.id}
              text={block.text}
          />
        )}
      </div>
    );
  }
}

function stateToProps(state) {
  return {
    blocks: state.blocks,
    isBeingEdited: state.editingIndex
  };
}

export default connect(stateToProps)(Journal);

Journal.propTypes = {
  dispatch: PropTypes.func.isRequired,
  isBeingEdited: PropTypes.bool.isRequired,
  blocks: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string.isRequired,
    isEditing: PropTypes.bool.isRequired,
    text: PropTypes.string.isRequired,
  }).isRequired).isRequired
};
