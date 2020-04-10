import { combineReducers } from 'redux'
import user from './user_reducer'
import genre from './genre_reducer'
import country from './country_reducer'
import product from './product_reducer'
import admin from './admin_reducer'

const rootReducer = combineReducers({
    user,
    genre,
    country,
    product,
    admin
})

export default rootReducer