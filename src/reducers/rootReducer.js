import { combineReducers } from 'redux';
import inputReducer from './inputReducer.js'

const rootReducer = combineReducers({
    inputs: inputReducer,
})

export default rootReducer