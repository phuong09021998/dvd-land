export default function (state={}, action) {
    switch (action.type) {
        case 'get_genre':
            return {...state, ...action.payload}
        case 'create_genre':
            return {...state, success: true}
        case 'update_genre':
            return {...state, success: true}
        case 'delete_genre':
            return {...state, success: true}
        default:
            return state
    }
}