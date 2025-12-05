import { combineReducers } from '@reduxjs/toolkit'
import contact from './contact'

const rootReducer = combineReducers({
    contactStore: contact
})

export default rootReducer