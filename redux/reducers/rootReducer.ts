import { combineReducers } from '@reduxjs/toolkit'
import championsReducer from './championsReducer'
import goldsReducer from './goldsReducer'
import itemsReducer from './itemsReducer'
import skinsReducer from './skinsReducer'

const rootReducer = combineReducers({
    golds: goldsReducer,
    champions: championsReducer,
    items: itemsReducer,
    useSkins: skinsReducer
})

export default rootReducer