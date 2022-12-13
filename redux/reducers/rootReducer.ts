import { combineReducers } from '@reduxjs/toolkit'
import goldsReducer from './goldsReducer'
import championsReducer from './championsReducer'

const rootReducer = combineReducers({
    golds: goldsReducer,
    champions: championsReducer
})

export default rootReducer