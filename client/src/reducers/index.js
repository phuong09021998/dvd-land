import { combineReducers } from 'redux'
import user from './user_reducer'
import genre from './genre_reducer'

const rootReducer = combineReducers({
    user,
    genre
})

export default rootReducer