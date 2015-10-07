import { INSERT_BLOCK, REMOVE_BLOCK } from '../constants/post-constants';

// delete after initial state is no longer needed
import uuid from 'node-uuid';

export const initialState = [
  {
    id: uuid.v4(),
    block: 'one',
    type: 'A'
  }, {
    id: uuid.v4(),
    block: 'two',
    type: 'A'
  }, {
    id: uuid.v4(),
    block: 'three',
    type: 'B'
  }
];

export default function blocks(state = initialState, action) {
  switch (action.type) {
    case INSERT_BLOCK:
      const { payload } = action;
      return [
        ...state.slice(0, payload.index + 1),
        {
          id: payload.id,
          block: payload.block,
          type: payload.blockType
        },
        ...state.slice(payload.index + 1)
      ];
    case REMOVE_BLOCK:
      return state.filter((block) => block.id !== action.payload.id);
    default:
      return state;
  }
}
