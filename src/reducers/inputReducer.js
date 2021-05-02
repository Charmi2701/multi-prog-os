import jQuery from 'jquery'

const initState = {
    instruction: ['Select'],
    address: [""],
    memory: Array.from({ length: 10 }, () => Array.from({ length: 10 }, () => [" "," "," "," "])),
    memoryStatus: [1,1,0,0,0,0,0,0,0,0],
    dataLines: 0,
    dataPointer: [1,0,1],
    addressAlert: false,
    inputData: [],
    outputData: [],
    gdcount: 0,
    register: [" "," ", " ", " "],
    toggleReg: 0,
    ic: 0,

}

const resetState = {
    instruction: ['Select'],
    address: [""],
    memory: Array.from({ length: 10 }, () => Array.from({ length: 10 }, () => [" "," "," "," "])),
    memoryStatus: [1,1,0,0,0,0,0,0,0,0],
    instPointer: [0,0,0],
    dataPointer: [1,0,1],
    addressAlert: false,
    inputData: [],
    outputData: [],
    gdcount: 0,
    register: [" "," ", " ", " "],
    toggleReg: 0,
    ic: 0,

}

const inputReducer = (state = initState, action) => {
    switch(action.type) {
        case 'Add Input':
            if(action.command !== "H" && action.command !== "Select") {
                let x = Math.floor(action.i/10);
                let y = action.i%10;
                let x2 = Math.floor(action.address/10);
                let y2 = action.address%10;
                state.memory[x][y][0] = action.command.slice(0,1);
                state.memory[x][y][1] = action.command.slice(1);
                state.memory[x][y][2] = action.address >= 10 ?(x2 ? x2 : "-") : "";
                state.memory[x][y][3] = action.address >= 10 ? (y2 ? y2 : 0) : action.address;
                state.dataPointer[0] = x + 1;
            } else if (action.command === "H") {
                let x = Math.floor(action.i/10);
                let y = action.i%10;
                state.memory[x][y][0] = action.command.slice(0,1);
                state.memory[x][y][1] = " ";
                state.memory[x][y][2] = " ";
                state.memory[x][y][3] = " ";
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
        case 'EXECUTE_GD':
            console.log("GD: ",action.i,",",state.ic);
            if(action.i === state.ic) {
                console.log("Executing GD");
                var x = state.inputData[state.gdcount];
                var counter1 = Math.floor(action.gdAddress/10);
                var counter2 = 0;
                var counter3 = 0;
                console.log(x);
                for(let ch in x) {
                    //console.log(x[ch]);
                    state.memory[counter1][counter2][counter3] = x[ch];
                    counter3++;
                    if(counter3 >= 4) {
                        counter2++;
                        counter3 = 0;
                    }
                    if(counter2 >= 10) {
                        console.log("Block exceeded");
                        return {
                            ...state,
                            gdcount: state.gdcount + 1,
                            ic: state.ic + 1,
                        };
                    }
                }
                return {
                    ...state,
                    gdcount: state.gdcount + 1,
                    ic: state.ic + 1,
                };
            } else {
                return state;
            }
        case 'EXECUTE_PD':
            console.log("PD: ",action.i,",",state.ic);
            if (action.i === state.ic) {
                console.log("Executing PD");
                var x = "";
                var b = Math.floor(action.pdAddress/10);
                for(let i in state.memory[b]) {
                    //console.log(state.memory[b][i]);
                    for(let j in state.memory[b][i]) {
                        x += state.memory[b][i][j];
                    }
                }
                //console.log("Output Data:",x);
                return {
                    ...state,
                    outputData: [
                        ...state.outputData,
                        x
                    ],
                    ic: state.ic + 1,
                };
            } else {
                return state;
            }
        case 'EXECUTE_LR':
            console.log("LR: ",action.i,",",state.ic);
            if (action.i === state.ic) {
                console.log('Executing LR');
                var x = Math.floor(action.lrAddress/10);
                var y = action.lrAddress%10;
                return {
                    ...state,
                    register: [
                        state.memory[x][y][0],
                        state.memory[x][y][1],
                        state.memory[x][y][2],
                        state.memory[x][y][3],
                    ],
                    ic: state.ic + 1,
                };
            } else {
                return state;
            }
        case 'EXECUTE_SR':
            console.log("SR: ",action.i,",",state.ic);
            if (action.i === state.ic) {
                console.log('Executing SR');
                var x = Math.floor(action.srAddress/10);
                var y = action.srAddress%10;
                state.memory[x][y][0] = state.register[0];
                state.memory[x][y][1] = state.register[1];
                state.memory[x][y][2] = state.register[2];
                state.memory[x][y][3] = state.register[3];
                return {
                    ...state,
                    ic: state.ic + 1,
                };
            } else {
                return state;
            }
        case 'EXECUTE_CR':
            console.log("CR: ",action.i,",",state.ic);
            if(action.i === state.ic) {
                console.log('Executing CR');
                var x = Math.floor(action.crAddress/10);
                var y = action.crAddress%10;
                var result = 0;
                if(
                    state.memory[x][y][0] === state.register[0] &&
                    state.memory[x][y][1] === state.register[1] &&
                    state.memory[x][y][2] === state.register[2] &&
                    state.memory[x][y][3] === state.register[3]
                ) {
                    result = 1;
                }
                return {
                    ...state,
                    toggleReg: result,
                    ic: state.ic + 1,
                };
            } else {
                return state;
            }
        case 'EXECUTE_H':
            console.log('Executing H');
            return {
                ...state,
                ic: 100,
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