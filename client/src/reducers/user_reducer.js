export default function (state={}, action) {
    switch (action.type) {
        case 'login_user':
            return {...state, ...action.payload}
        case 'register_user':
            return {...state, ...action.payload}
        case 'get_user':
            return {...state, ...action.payload}
        case 'get_user_cart':
            return {...state, userCart: action.payload}
        case 'logout_user':
            state.user = undefined
            return {...state}
        case 'add_to_cart':
            return {...state, success: true}
        case 'get_cart_items':
            return {...state, cartItem: action.payload}
        case 'remove_cart':
            return {...state, cartItem: null}
        case 'success_buy':
            return {
                ...state,
                successBuy: action.payload.success,
                user:{
                    ...state.user,
                    cart: action.payload.cart
                },
                cartItem: []
            }
        case 'update_user':
            return {...state, ...action.payload}
        default:
            return state
    }
}