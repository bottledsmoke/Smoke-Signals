import expect from 'expect';
import { SAY_HELLO, sayHello } from '../actions';

describe('Actions', () => {
  it('should create an action to say hello', () => {
    const text = 'Hello test buddy!';
    const expectedAction = {
      type: SAY_HELLO,
      payload: {
        text: text
      }
    };
    expect(sayHello(text)).toEqual(expectedAction);
  });
});
