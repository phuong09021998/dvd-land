export default function (state={}, action) {
    switch (action.type) {
        case 'get_country':
            return {...state, ...action.payload}
        case 'create_country':
            return {...state, success: true}
        case 'update_country':
            return {...state, success: true}
        case 'delete_country':
            return {...state, success: true}
        default:
            return state
    }
}