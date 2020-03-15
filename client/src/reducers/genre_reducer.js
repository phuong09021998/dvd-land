export default function (state={}, action) {
    switch (action.type) {
        case 'get_genre':
            return {...state, ...action.payload}
            
        default:
            return state
    }
}