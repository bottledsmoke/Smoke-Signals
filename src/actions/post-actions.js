import * as constants from '../constants/post-constants';
import uuid from 'node-uuid';

export function insertBlock(block, blockType, index) {
  return {
    type: constants.INSERT_BLOCK,
    payload: {
      id: uuid.v4(),
      index: index,
      block: block,
      blockType: blockType
    }
  };
}

export function removeBlock(id) {
  return {
    type: constants.REMOVE_BLOCK,
    payload: {
      id: id
    }
  };
}

export function reorderBlock(movedBlockId, nextBlockId) {
  return {
    type: constants.REORDER_BLOCK,
    movedBlock: movedBlockId,
    nextBlock: nextBlockId
  };
}
