import * as constants from '../constants/journal-constants';
import uuid from 'node-uuid';

export function editBlockText(text, id) {
  return {
    type: constants.EDIT_BLOCK_TEXT,
    payload: {
      text: text,
      id: id
    }
  };
}

export function setEditingIndex(id) {
  return {
    type: constants.SET_EDITING_INDEX,
    payload: {
      id: id
    }
  };
}

export function splitBlock(text) {
  return {
    type: constants.SPLIT_BLOCK,
    payload: {
      text: text,
      id: uuid.v4()
    }
  };
}

export function combineBlock(text, id) {
  return {
    type: constants.COMBINE_BLOCK,
    payload: {
      text: text,
      id: id
    }
  };
}
