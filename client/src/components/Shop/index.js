import React, { useEffect, useState } from 'react'
import LeftMenu from './LeftMenu'
import { connect } from 'react-redux'
import { update, generateData, isFormValid } from '../utils/Form/FormAction'
import { getProductsToShop, removeSearch } from '../../actions/product_action'
import RightMenu from './RightMenu'
import RightMenuList from './RightMenuList'

function Shop(props) {

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
                    data: props.genre ? props.genre : []
                },
                country: {
                    ...shopForm.formData.country,
                    data: props.country ? props.country : []
                }
            }
        })
    }, [props.genre, props.country])

    

    const getCount = () => loadMore.skip + loadMore.limit

    useEffect(() => {
        props.dispatch(removeSearch())
        setLoadMore({
            skip: 0,
            limit: 9
        })
    }, [])

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
        props.dispatch(getProductsToShop(dataToSubmit, loadMore.skip, loadMore.limit, props.shop || []))
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