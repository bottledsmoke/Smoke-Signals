import expect from 'expect';
import { INSERT_BLOCK, REMOVE_BLOCK } from '../../constants/post-constants';
import { insertBlock, removeBlock } from '../post-actions';

describe('Block Action Creators', () => {
  it('create insert block actions correctly', () => {
    const block = 'This is block speaking';
    const id = String(Math.floor(Math.random(0,30)));
    const expectedAction = {
      type: INSERT_BLOCK,
      payload: {
        block: block,
        id: id
      }
    };
    const action = insertBlock(block);
    expect(action.payload.block).toEqual(expectedAction.payload.block);
    expect(action.payload.id).toExist();
  });
  it('create remove block actions correctly', () => {
    const id = String(Math.floor(Math.random(0,30)));
    const expectedAction = {
      type: REMOVE_BLOCK,
      payload: {
        id: id
      }
    };
    expect(removeBlock(id)).toEqual(expectedAction);
  });
});

