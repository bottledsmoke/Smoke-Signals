import React, { PropTypes } from 'react';

export default class Block extends React.Component {
  render() {
    const { id, text, type, onRemoveClick,
            onMoveClick, onInsertClick } = this.props;
    return (
      <div className="block"
           key={`block:${id}`}
           style={{backgroundColor: type === 'A' ? '#a00' : '#0a0'}}>
        <h1>{text}</h1>
        <button onClick={onRemoveClick}>{'X'}</button>
        <button onClick={onMoveClick}>{'M'}</button>
        <hr/>
        <div onClick={() => onInsertClick(undefined, undefined)}
             style={{height: '50px', backgroundColor: '#3f3f3f'}}>
        </div>
      </div>
    );
  }
}

Block.propTypes = {
  id: PropTypes.string.isRequired,
  onInsertClick: PropTypes.func.isRequired,
  onMoveClick: PropTypes.func.isRequired,
  onRemoveClick: PropTypes.func.isRequired,
  text: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired
};
