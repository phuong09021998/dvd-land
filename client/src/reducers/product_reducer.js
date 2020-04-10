export default function (state={}, action) {
    switch (action.type) {
        case 'create_product':
            return {...state, success: true}
        case 'get_products':
            return {...state, products: action.payload}
        case 'get_new_arrivals':
            return {...state, newArrivals: action.payload}
        case 'get_sales':
            return {...state, sales: action.payload}
        case 'get_best_selling':
            return {...state, best_selling: action.payload}
        case 'search_product':
            return {...state, search: action.payload}
        case 'remove_search':
            if (action.from === 'header') {
                return {...state, search: null}
            } else {
                return {...state, toShop: null}
            }
            
        case 'search_product_page':
            return {...state, searchPage: action.payload}
        case 'product_to_shop':
            return {...state, toShop: action.payload.articles}
        case 'by_id':
            return {...state, byId: action.payload}
        case 'product_to_admin' :
            return {...state, productAdmin: action.payload}
        case 'update_product':
            return {...state, success: true}
        case 'delete_product':
            return {...state, success: true}
        case 'local_storage':
            return {...state, localStorage: action.payload}
        case 'remove_storage':
            return {...state, localStorage: null}
        default:
            return state
    }
}