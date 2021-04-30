export const addInput = (props) => {
    return (dispatch, getState) => {
        console.log(dispatch);
        dispatch({type: 'Add Input', i: props.i, command: props.command, address: props.address});

        // switch(props.command) {
        //     case "GD":
        //         console.log('GD');
        //         if(props.address === undefined) {
        //             //return(<AddressAlert show="true" />)
        //             console.log("Address Required");
        //             dispatch({type:"ADD_NOT_FOUND"});
        //         } else {
        //             console.log("Execute GD");
        //         }
        //         break;
        //     case "PD":
        //         console.log('PD');
        //         if(props.address === undefined) {
        //             console.log("Address Required");
        //         } else {
        //             console.log("Execute PD: ",props.address);
        //         }
        //         break;
        //     default:
        //         console.log('Error');
        // }
    }
}

export const reset = (props) => {
    return (dispatch, getState) => {
        console.log(dispatch);
        console.log('Dispatching reset req');
        dispatch({type: 'Reset'});
        console.log('Request Dispatched');
    }
}

export const setDataInMemory = (props) => {
    return (dispatch, getState) => {
        dispatch({type: 'DATA_TO_MEMORY', data: props.data}, );
    }
}

export const gd = (props) => {
    return(dispatch, getState) => {
        dispatch({type: 'EXECUTE_GD', gdAddress: props.address});
    }
}

export const pd = (props) => {
    return(dispatch, getState) => {
        dispatch({type: 'EXECUTE_PD', pdAddress: props.address});
    }
}

export const lr = (props) => {
    return(dispatch, getState) => {
        dispatch({type: 'EXECUTE_LR', lrAddress: props.address});
    }
}