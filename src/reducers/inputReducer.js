const initState = {
    instruction: ['GD'],
    address: [""],
    memory: Array.from({ length: 10 }, () => Array.from({ length: 10 }, () => ["-","-","-","-"])),
    memoryStatus: [1,1,0,0,0,0,0,0,0,0],
    instPointer: [0,0,0],
    dataPointer: [1,0,1],
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
                state.memory[state.instPointer[0]][state.instPointer[1]+action.i][state.instPointer[2]] = action.command.slice(0,1);
                state.instPointer[2] += 1;
                //console.log(state.instPointer[2]);
                state.memory[state.instPointer[0]][state.instPointer[1]+action.i][state.instPointer[2]] = action.command.slice(1);
                state.instPointer[2] += 1;
                //console.log(action.address.slice(0,1));
                state.memory[state.instPointer[0]][state.instPointer[1]+action.i][state.instPointer[2]] = action.address > 10 ?(action.address/10 ? action.address/10 : "-") : "";
                state.instPointer[2] += 1;
                state.memory[state.instPointer[0]][state.instPointer[1]+action.i][state.instPointer[2]] = action.address > 10 ? (action.address%10 ? action.address%10 : 0) : action.address;

                state.instPointer[2] = 0;
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
        case 'Reset':
            console.log('Reset')
            return initState;
        default:
            console.log('Input reducer')
            return state;
    }
}
 
export default inputReducer;