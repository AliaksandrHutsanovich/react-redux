export const getUndoOperation = state => state.unDoReducer.getIn(['undoOperations', state.unDoReducer.get('undoOperations').toArray().length - 1, 'undoOperation']); 

export const getRedoOperation = state => state.reDoReducer.getIn(['redoOperations', state.reDoReducer.get('redoOperations').toArray().length - 1, 'redoOperation']);

export const getObjFromUndoOperation = state => {
    let obj = state.unDoReducer.getIn(['undoOperations', state.unDoReducer.get('undoOperations').toArray().length - 1, 'obj']);
    obj.value = !obj.value;
    return obj;
}

export const getObjFromRedoOperation = state => { 
    let obj = state.reDoReducer.getIn(['redoOperations', state.reDoReducer.get('redoOperations').toArray().length - 1, 'obj']);
    obj.value = !obj.value;
    return obj;
}


export const getUndoOperationFromRedo = state => state.reDoReducer.getIn(['redoOperations', state.reDoReducer.get('redoOperations').toArray().length - 1, 'undoOperation']);

export const getReDoOperationFromUndo = state => state.unDoReducer.getIn(['undoOperations', state.unDoReducer.get('undoOperations').toArray().length - 1, 'redoOperation']);


export const getObjWrapperFromUndoOperation = state => state.unDoReducer.getIn(['undoOperations', state.unDoReducer.get('undoOperations').toArray().length - 1]);

export const getObjWrapperFromRedoOperation = state => state.reDoReducer.getIn(['redoOperations', state.reDoReducer.get('redoOperations').toArray().length - 1]);