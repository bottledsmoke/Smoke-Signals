import { blocks, editingIndex } from './post-reducers';
// import entries from './journal-reducers';
import { combineReducers } from 'redux';

const rootReducer = combineReducers({
  blocks,
  editingIndex
});

export default rootReducer;
