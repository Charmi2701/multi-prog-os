export const addInput = (props) => {
    return (dispatch, getState) => {
        dispatch({type: 'Add Input', i: props.i, command: props.command, address: props.address});

        switch(props.command) {
            case "GD":
                console.log('GD');
                if(props.address === "") {
                    console.log("Address Required");
                } else {
                    console.log("Execute GD");
                }
                break;
            case "PD":
                console.log('PD');
                if(props.address === "") {
                    console.log("Address Required");
                } else {
                    console.log("Execute PD");
                }
                break;
            default:
                console.log('Error');
        }
    }
}

export const reset = (props) => {
    console.log('Reset Request')
    return (dispatch, getState) => {
        dispatch({type: 'Reset'});
    }
}