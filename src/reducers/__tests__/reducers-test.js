import expect from 'expect';
import reducer from '../reducers';
import * as constants from '../../actions/actions';

describe('Reducer', () => {
  it('Should return the initial state', () => {
    expect(
      reducer(undefined, {})
    ).toEqual({
      greeting: { text: 'Hello World' }
    });
  });
  it('Should handle sayHello', () => {
    expect(
      reducer({}, {
        type: constants.SAY_HELLO,
        payload: {
          text: 'Hi!'
        }
      })
    ).toEqual({
      greeting: {
        text: 'Hi!'
      }
    });
  });
});
