var uuid = require('node-uuid');

module.exports = {
  blocks: [
    {
      id: uuid.v4(),
      text: 'The quick brown fox',
      type: 'A'
    }, {
      id: uuid.v4(),
      text: 'Jumps over',
      type: 'A'
    }, {
      id: uuid.v4(),
      text: 'The lazy dog',
      type: 'B'
    }
  ],
  editingIndex: ''
};
