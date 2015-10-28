import expect from 'expect';
import uuid from 'node-uuid';
import { blocks } from '../post-reducers';
import { blocks as initialState } from '../../../lib/initialState';
import { INSERT_BLOCK, REMOVE_BLOCK } from '../../constants/post-constants';
import { COMBINE_BLOCK, SPLIT_BLOCK } from '../../constants/journal-constants';

const newBlock = {
  id: uuid.v4(),
  text: 'TEST BLOCK',
  type: 'A'
};

describe('Blocks Reducer', () => {
  it('be able to run tests', () => {
    expect(1 + 1).toEqual(2);
  });
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
          text: newBlock.text,
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
          text: newBlock.text,
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
          text: newBlock.text,
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
  it('should combine blocks', () => {
    /*
     * Args: sourceIndex - block to be added to
             additionIndex - block to be added
    */
    const sourceIndex = 1;
    const additionIndex = 2;
    expect(
      blocks(initialState, {
        type: COMBINE_BLOCK,
        payload: {
          sourceIndex: sourceIndex,
          additionIndex: additionIndex
        }
      })
    ).toEqual([
      ...initialState.slice(0, sourceIndex),
      { ...initialState[sourceIndex],
        text: initialState[sourceIndex].text +
              ' ' +
              initialState[additionIndex].text
      },
      ...initialState.slice(additionIndex + 1)
    ]);
  });
  it('should split blocks', () => {
    const blockIndex = initialState.length - 2;
    const stringSplitIndex = 4;
    const payloadId = uuid.v4();
    expect(
      blocks(initialState, {
        type: SPLIT_BLOCK,
        payload: {
          id: payloadId,
          blockIndex: blockIndex,
          stringSplitIndex: stringSplitIndex
        }
      })
    ).toEqual([
      ...initialState.slice(0, blockIndex),
      {
        ...initialState[blockIndex],
        text: initialState[blockIndex].text.slice(0, stringSplitIndex),
      },
      {
        id: payloadId,
        text: initialState[blockIndex].text.slice(stringSplitIndex),
        type: 'A'
      },
      ...initialState.slice(blockIndex + 1)
    ]);
  });
});
