export default function (state={}, action) {
    switch (action.type) {
        case 'get_users':
            return {...state, ...action.payload}
        case 'update_user':
            return {...state, success: true}
        case 'delete_user':
            return {...state, success: true}
        case 'search_user':
            return {...state, ...action.payload}
        default:
            return state
    }
}