import { findIndex } from 'lodash';
import { INSERT_BLOCK, REMOVE_BLOCK } from '../constants/post-constants';
import { SET_EDITING_INDEX, EDIT_BLOCK_TEXT,
         COMBINE_BLOCK, SPLIT_BLOCK } from '../constants/journal-constants';

// delete after initial state is no longer needed
import initialState from '../../lib/initialState';

export function blocks(state = initialState.blocks, action) {
  const { payload } = action;
  switch (action.type) {
    case INSERT_BLOCK:
      return [
        ...state.slice(0, payload.index + 1),
        {
          id: payload.id,
          text: payload.block,
          type: payload.blockType
        },
        ...state.slice(payload.index + 1)
      ];
    case REMOVE_BLOCK:
      return blocks.filter((block) => block.id !== action.payload.id);
    case EDIT_BLOCK_TEXT:
      const index = findIndex(state, {id: payload.id});
      return [
        ...state.slice(0, index),
        {
          ...state[index],
          text: payload.text
        },
        ...state.slice(index + 1)
      ];
    case COMBINE_BLOCK:
      return state;
    case SPLIT_BLOCK:
      return state;
    default:
      return state;
  }
}

export function editingIndex(state = initialState.editingIndex, action) {
  const { payload } = action;
  switch (action.type) {
    case SET_EDITING_INDEX:
      return payload.id;
    default:
      return state;
  }
}
