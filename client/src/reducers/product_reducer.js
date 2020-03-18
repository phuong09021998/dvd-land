export default function (state={}, action) {
    switch (action.type) {
        case 'create_product':
            return {...state, ...action.payload}
            
        default:
            return state
    }
}