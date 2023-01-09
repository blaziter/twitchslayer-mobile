import { combineReducers } from '@reduxjs/toolkit'
import championsReducer from './championsReducer'
import goldsReducer from './goldsReducer'
import itemsReducer from './itemsReducer'

const rootReducer = combineReducers({
    golds: goldsReducer,
    champions: championsReducer,
    items: itemsReducer
})

export default rootReducer