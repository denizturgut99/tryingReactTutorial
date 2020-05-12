import {
    combineReducers
} from "redux"
import location from './location';
import theme from './theme'

// combineReducers is a convenience function from 
// Redux so you don't have to write your own root reducer
// everytime location changes the ./location reducer runs
export default combineReducers({
    location,
    theme
})