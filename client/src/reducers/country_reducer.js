export default function (state={}, action) {
    switch (action.type) {
        case 'get_country':
            return {...state, ...action.payload}
            
        default:
            return state
    }
}