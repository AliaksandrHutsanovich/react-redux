export const getUndoOperation = ({ unDoReducer }) => unDoReducer
  .getIn([
    'undoOperations',
    unDoReducer
      .get('undoOperations').toArray().length - 1,
    'undoOperation',
  ]);

export const getRedoOperation = ({ reDoReducer }) => reDoReducer
  .getIn([
    'redoOperations',
    reDoReducer
      .get('redoOperations').toArray().length - 1,
    'redoOperation',
  ]);

export const getObjFromUndoOperation = ({ unDoReducer }) => {
  const obj = unDoReducer
    .getIn([
      'undoOperations',
      unDoReducer
        .get('undoOperations').toArray().length - 1,
      'obj',
    ]);
  obj.value = !obj.value;
  return obj;
};

export const getObjFromRedoOperation = ({ reDoReducer }) => {
  const obj = reDoReducer
    .getIn([
      'redoOperations',
      reDoReducer
        .get('redoOperations').toArray().length - 1,
      'obj',
    ]);
  obj.value = !obj.value;
  return obj;
};

// export const getUndoOperationFromRedo = (state) => state
//   .reDoReducer.getIn([
//     'redoOperations',
//     state.reDoReducer
//       .get('redoOperations').toArray().length - 1,
//     'undoOperation',
//   ]);

// export const getReDoOperationFromUndo = (state) => state
//   .unDoReducer.getIn([
//     'undoOperations',
//     state.unDoReducer
//       .get('undoOperations').toArray().length - 1,
//     'redoOperation',
//   ]);

export const getObjWrapperFromUndoOperation = ({ unDoReducer }) => unDoReducer
  .getIn([
    'undoOperations',
    unDoReducer.get('undoOperations')
      .toArray().length - 1,
  ]);

export const getObjWrapperFromRedoOperation = ({ reDoReducer }) => reDoReducer
  .getIn([
    'redoOperations',
    reDoReducer.get('redoOperations')
      .toArray().length - 1,
  ]);
