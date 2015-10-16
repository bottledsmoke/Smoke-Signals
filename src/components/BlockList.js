import React, { PropTypes } from 'react';
import Block from './block';

export default class BlockList extends React.Component {
  render() {
    const { handleRemove, handleMove, handleInsert } = this.props;
    return (
      <div>
        <h1>{'Block List'}</h1>
        <div onClick={() => handleInsert(undefined, undefined, -1)}
            style={{height: '50px', backgroundColor: '#3f3f3f'}}
        >
        </div>
        {
          this.props.blocks.map((block, index) =>
            <Block {...block}
                index={index}
                key={block.id}
                onInsertClick={(text, blockType) =>
                  handleInsert(text, blockType, index)}
                onMoveClick={() => handleMove(index)}
                onRemoveClick={() => handleRemove(block.id)}
                text={block.text}
                type={block.type}
            />
          )
        }
      </div>
    );
  }
}

BlockList.propTypes = {
  blocks: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string.isRequired,
    text: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired
  }).isRequired).isRequired,
  handleInsert: PropTypes.func.isRequired,
  handleMove: PropTypes.func.isRequired,
  handleRemove: PropTypes.func.isRequired
};
