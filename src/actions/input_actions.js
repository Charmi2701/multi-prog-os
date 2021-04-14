export const addInput = (props) => {
    return (dispatch, getState) => {
        dispatch({type: 'Add Input', i: props.i, command: props.command, address: props.address});
    }
}

export const reset = (props) => {
    console.log('Reset Request')
    return (dispatch, getState) => {
        dispatch({type: 'Reset'});
    }
}