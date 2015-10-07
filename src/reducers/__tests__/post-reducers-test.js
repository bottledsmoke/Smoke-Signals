import expect from 'expect';
import blocks, { initialState } from '../post-reducers';
import { INSERT_BLOCK, REMOVE_BLOCK } from '../../constants/post-constants';
import uuid from 'node-uuid';

const newBlock = {
  id: uuid.v4(),
  block: 'TEST BLOCK',
  type: 'A'
};

describe('Blocks reducer', () => {
  it('should return the initial state', () => {
    expect(
      blocks(undefined, {})
    ).toEqual(initialState);
  });
  it('should push a block to the end when passing state.length', () => {
    expect(
      blocks(initialState, {
        type: INSERT_BLOCK,
        payload: {
          block: newBlock.block,
          id: newBlock.id,
          index: initialState.length,
          blockType: newBlock.type
        }
      })
    ).toEqual(
      initialState.concat(newBlock)
    );
  });
  it('should insert into any index using insertBlock', () => {
    const index = Math.floor(initialState.length / 2);
    expect(
      blocks(initialState, {
        type: INSERT_BLOCK,
        payload: {
          block: newBlock.block,
          id: newBlock.id,
          index: index,
          blockType: newBlock.type
        }
      })).toEqual([
        ...initialState.slice(0, index + 1),
        newBlock,
        ...initialState.slice(index + 1)
      ]);
  });
  it('should unshift blocks when passing -1 to insertBlock', () => {
    expect(
      blocks(initialState, {
        type: INSERT_BLOCK,
        payload: {
          block: newBlock.block,
          id: newBlock.id,
          index: -1,
          blockType: newBlock.type
        }
      })
    ).toEqual(
      [newBlock, ...initialState]
    );
  });
  it('should remove blocks correctly using insertBlock', () => {
    const filterId = initialState[2].id;
    expect(
      blocks(initialState, {
        type: REMOVE_BLOCK,
        payload: {
          id: filterId
        }
      })
    ).toEqual(
      initialState.filter(block => block.id !== filterId)
    );
  });
});
