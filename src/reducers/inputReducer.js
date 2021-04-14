const initState = {
    instruction: ['GD'],
    address: [""],
    memory: Array.from({ length: 10 }, () => Array.from({ length: 10 }, () => ["-","-","-","-"])),
}
const inputReducer = (state = initState, action) => {
    switch(action.type) {
        case 'Add Input':
            //console.log('Adding Input')
            //console.log(state);
            //console.log(action)
            //return state;
            return {
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