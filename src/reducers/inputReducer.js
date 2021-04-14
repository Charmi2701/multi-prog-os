const initState = {
    instruction: ['GD'],
    address: [10]
}
const inputReducer = (state = initState, action) => {
    switch(action.type) {
        case 'Hello-World':
            console.log('Hello World IR');
            return state;
        case 'INPUT_ERROR':
            console.log('Error');
            return state;
        default:
            console.log('Input reducer')
            return state;
    }
}
 
export default inputReducer;