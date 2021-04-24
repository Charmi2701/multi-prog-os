import jQuery from 'jquery'

const initState = {
    instruction: ['GD'],
    address: [""],
    memory: Array.from({ length: 10 }, () => Array.from({ length: 10 }, () => ["-","-","-","-"])),
    memoryStatus: [1,1,0,0,0,0,0,0,0,0],
    dataLines: 0,
    dataPointer: [1,0,1],
    addressAlert: false,
    inputData: [],
}

const resetState = {
    instruction: ['GD'],
    address: [""],
    memory: Array.from({ length: 10 }, () => Array.from({ length: 10 }, () => ["-","-","-","-"])),
    memoryStatus: [1,1,0,0,0,0,0,0,0,0],
    instPointer: [0,0,0],
    dataPointer: [1,0,1],
    addressAlert: false,
    inputData: [],
}

const inputReducer = (state = initState, action) => {
    switch(action.type) {
        case 'Add Input':
            //console.log('Adding Input')
            //console.log(state);
            //console.log(action)
            //return state;
            //console.log(state.memory.slice(1,2)[0][5][3]);
            if(action.command !== "H") {
                let x = Math.floor(action.i/10);
                let y = action.i%10;
                //console.log(Math.floor(x));
                //console.log(y);
                // console.log(action.i);
                state.memory[x][y][0] = action.command.slice(0,1);
                //state.instPointer[2] += 1;
                //console.log(state.instPointer[2]);
                state.memory[x][y][1] = action.command.slice(1);
                //state.instPointer[2] += 1;
                //console.log(action.address.slice(0,1));
                state.memory[x][y][2] = action.address > 10 ?(action.address/10 ? action.address/10 : "-") : "";
                //state.instPointer[2] += 1;
                state.memory[x][y][3] = action.address > 10 ? (action.address%10 ? action.address%10 : 0) : action.address;
                state.dataPointer[0] = x + 1;
                // state.instPointer[2] = 0;
            }
            return {
                ...state,
                instruction: [
                    ...state.instruction.slice(0,action.i),
                    action.command,
                    ...state.instruction.slice(action.i+1)
                ],
                address: [
                    ...state.address.slice(0,action.i),
                    action.address,
                    ...state.address.slice(action.i+1)
                ],
            };
        case 'DATA_TO_MEMORY':
            console.log('Adding data to memory');
            return {
                ...state,
                inputData: action.data
            }
        case 'ADD_NOT_FOUND':
            console.log('Address Not Found');
            return {
                ...state,
                addressAlert: true
            };
        case 'Reset':
            console.log('Reset')
            //console.log(initState);
            return jQuery.extend(true, {}, resetState);
        default:
            console.log('Input reducer')
            return state;
    }
}
 
export default inputReducer;