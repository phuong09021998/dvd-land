export default function (state={}, action) {
    switch (action.type) {
        case 'login_user':
            return {...state, ...action.payload}
        case 'register_user':
            return {...state, ...action.payload}
        case 'get_user':
            return {...state, ...action.payload}
        case 'logout_user':
            state.user = undefined
            return {...state}
            
        default:
            return state
    }
}