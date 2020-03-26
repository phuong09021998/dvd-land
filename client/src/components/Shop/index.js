import React, { useEffect, useState, useRef } from 'react'
import LeftMenu from './LeftMenu'
import { connect } from 'react-redux'
import { update, generateData } from '../utils/Form/FormAction'
import { getProductsToShop, removeSearch } from '../../actions/product_action'
import RightMenu from './RightMenu'
import RightMenuList from './RightMenuList'
import { useLocation } from 'react-router-dom'


function useQuery() {
    return new URLSearchParams(useLocation().search);
}

function Shop(props) {
    let query = useQuery();
    const [initial, setInitial] = useState({
        genre: query.get('genre') ? [query.get('genre')] : false,
        country: query.get('country') || false,
        key: query.get('key') || false
    })


    const isFirstRun = useRef(true)

    const [shopForm, setShopform] = useState({
        formError: false,
        formMessage: '',
        formData: {
            key: {
                element: 'input',
                value: '',
                config: {
                    name: 'key_input',
                    type: 'text',
                    placeholder: 'Search'
                },
                validation: {
                    required: false
                },
                valid: true,
                touched: false,
                validationMessage: ''
            },
            genre: {
                element: 'checkbox',
                value: [],
                data: [],
                config: {
                    name: 'genre_input',
                    type: 'checkbox'
                },
                label: 'Select genres:',
                validation: {
                    checkbox: true
                },
                valid: true,
                validationMessage: 'You must choose at least one genre'
            },
            country: {
                element: 'radio',
                value: '',
                data: [],
                title: 'Select the country:',
                config :{
                    name: 'country_input',
                    type: 'radio'
                },
                valid: true,
                validation: {
                    required: false
                },
                validationMessage: ''
            }
        }
    })

    const [dataToSubmit, setDataToSubmit] = useState({})
    const [boxview, setBoxview] = useState(true)

    const updateForm = (element) => {
        const idChange = element.id
        let newInitial = initial
        newInitial[element.id] = false
        console.log(newInitial)
        setInitial(newInitial)
        const newFormData = update(element, shopForm.formData, 'shop')
        setShopform({
            ...shopForm,
            formData: newFormData,
            formError: false
        })
    }
    const [loadMore, setLoadMore] = useState({
        skip: 0,
        limit: 9
    })

    const handleSubmit = (e) => {
        e.preventDefault()

        setDataToSubmit(generateData(shopForm.formData, 'shop'))
        props.dispatch(removeSearch())
        if (boxview) {
            setLoadMore({
                skip: 0,
                limit: 9
            })
        } else {
            setLoadMore({
                skip: 0,
                limit: 6
            })
        }
       
    }

    // useEffect(() => {
    //     props.dispatch(getProductsToShop(dataToSubmit))
    // }, [dataToSubmit])
    
    useEffect(() => {
        setShopform({
            ...shopForm,
            formData: {
                ...shopForm.formData,
                genre: {
                    ...shopForm.formData.genre,
                    data: props.genre ? props.genre : [],
                    value: initial.genre.length ? initial.genre : []
                },
                country: {
                    ...shopForm.formData.country,
                    data: props.country ? props.country : [],
                    value: initial.country || ""
                },
                key: {
                    ...shopForm.formData.key,
                    value: initial.key || ""
                }
            }
        })
    }, [props.genre, props.country])

    // useEffect(() => {
    //     setDataToSubmit(generateData(shopForm.formData, 'shop'))
    // },[shopForm])

    // useEffect(() => {
    //     console.log(dataToSubmit)
    //     props.dispatch(removeSearch())
    //     props.dispatch(getProductsToShop(dataToSubmit, loadMore.skip, loadMore.limit, props.shop || []))
    // }, [dataToSubmit])

    const getCount = () => loadMore.skip + loadMore.limit

    // useEffect(() => {
    //     props.dispatch(removeSearch())
    //     setLoadMore({
    //         skip: 0,
    //         limit: 9
    //     })
    // }, [])

    const handleListView = ({e, id}) => {
        e.preventDefault()
        if (id === 'box') {
            setBoxview(true)
        } else {
            setBoxview(false)
        }
    }

    const handleLoadMore = () => {
        if (boxview) {
            setLoadMore({
                ...loadMore,
                skip: getCount(),
                limit: 6
            })
        } else {
            setLoadMore({
                ...loadMore,
                skip: getCount(),
                limit: 3
            })
        }
        
    }

    useEffect(() => {
        props.dispatch(removeSearch())
        if (boxview) {
            setLoadMore({
                skip: 0,
                limit: 9
            })
        } else {
            setLoadMore({
                skip: 0,
                limit: 6
            })
        }
    }, [boxview])

    useEffect(() => {
        if (isFirstRun.current) {
            isFirstRun.current = false

            
        } else {

            if (Object.keys(dataToSubmit).length) {
                props.dispatch(getProductsToShop(dataToSubmit, loadMore.skip, loadMore.limit, props.shop || []))
            } else {
                props.dispatch(getProductsToShop(initial, loadMore.skip, loadMore.limit, props.shop || []))
            }
        }
        
    }, [loadMore])

    
    

    return (
        <div className="container">
            <div className="login_title" style={{color: 'black'}}>Shop</div>
            <div className="shop_box_wrapp" style={{marginBottom: '150px'}}>
                <div className="shop_left">
                    <LeftMenu
                        country={props.country}
                        shopForm={shopForm}
                        submitForm={e => handleSubmit(e)}
                        change={element => updateForm(element)}
                        initial={initial}
                    />
                </div>
                <div className="shop_right">
                    <div className="top_view_control">
                        <div className="view_icon_wrapp">
                            <button className="list_view_button" onClick={e => handleListView({e, id: 'box'})}><i class="fas fa-th top_icon_shop" id={boxview ? 'view_active' : null}></i></button>
                            <button className="list_view_button" onClick={e => handleListView({e, id: 'list'})}><i class="fa fa-bars top_icon_shop" id={boxview ? null : 'view_active'}></i></button>
                            
                        </div>
                    </div>
                    {boxview ? <RightMenu products={props.shop} /> : <RightMenuList products={props.shop} /> }
                    
                    {props.shop ?
                        props.shop.length === getCount() ? 
                            <button className="load_more" onClick={handleLoadMore}>Load more</button>
                        : null
                    
                    : null}
                    
                </div>
            </div>
        </div>
    )
}

const mapStateToProps = (state) => {
    return {
        country: state.country.countries,
        genre: state.genre.genres,
        searchPage: state.product.searchPage,
        shop: state.product.toShop
    }
}

export default connect(mapStateToProps)(Shop)