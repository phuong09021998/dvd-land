export default function (state={}, action) {
    switch (action.type) {
        case 'login_user':
            return {...state, loginSuccess: action.payload}
        case 'register_user':
            return {...state, user: action.payload}
    
        default:
            return state
    }
}