import { combineReducers } from 'redux';
import { SAY_HELLO } from '../actions/actions';

const initialState = {
  text: 'Hello World'
};

function greeting(state = initialState, action) {
  switch (action.type) {
    case SAY_HELLO:
      return {
        text: action.payload.text
      };
    default:
      return state;
  }
}

const rootReducer = combineReducers({
  greeting
});

export default rootReducer;
