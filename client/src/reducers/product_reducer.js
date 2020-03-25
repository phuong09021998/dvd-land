export default function (state={}, action) {
    switch (action.type) {
        case 'create_product':
            return {...state, ...action.payload}
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
            return {...state, search: null, toShop: null}
        case 'search_product_page':
            return {...state, searchPage: action.payload}
        case 'product_to_shop':
            return {...state, toShop: action.payload.articles}
        default:
            return state
    }
}