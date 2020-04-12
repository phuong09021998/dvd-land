const User = require('../models/user')
const Product = require('../models/product')
const bcrypt = require('bcrypt')
const mongoose = require('mongoose')
const { Payment } = require('../models/payment')
const async = require('async')


exports.readUser = (req, res) => {
    res.status(200).json({
        user: req.user
    })
}



exports.createUser = (req, res) => {
    const user = new User(req.body)
    user.generateToken((err, user) => {
        if (err) {
            return res.status(400).json({err})
        }


        res.cookie('c_auth', user.token).status(200).json({user})
    })
}

exports.loginUser = (req, res) => {
    const email = req.body.email
    const password = req.body.password
    User.findOne({email}, (err, user) => {
        if (err) {
            return res.status(400).json({err})
            
        }
        bcrypt.compare(password, user.password, (err, valid) => {
            if (err) {
                throw new Error('Something went wrong')
            }
            if (!valid) {
                return res.status(400).json({err: 'Password is incorrect'})
            }
            user.generateToken((err, user) => {
                if (err) {
                    return res.status(400).json({err})
                }
        
                user.password = undefined
                res.cookie('c_auth', user.token).status(200).json({user})
            })
        })
    })
}



exports.updateUser = (req, res) => {

    // bcrypt.hash(this.password, 8, (err, hash) => {
    //     if (err) {
    //         throw new Error('Something went wrong')
    //     }

    //     user.password = hash
    //     next()
    // })
    let newUser = req.body
    if (newUser.password) { 
        bcrypt.hash(newUser.password, 8, (err, hash) => {
            if (err) {
                throw new Error('Something went wrong')
            }
    
            newUser.password = hash
            User.findOneAndUpdate(
                { _id: req.user._id },
                {
                    "$set": newUser
                },
                { new: true },
                (err,doc)=>{
                    if(err) return res.json({success:false,err});
                    return res.status(200).send({
                        doc
                    })
                }
            );
        })
    } else {
        User.findOneAndUpdate(
            { _id: req.user._id },
            {
                "$set": req.body
            },
            { new: true },
            (err,doc)=>{
                if(err) return res.json({success:false,err});
                return res.status(200).send({
                    success:true
                })
            }
        );
    }
  
}

exports.deleteUser = (req, res) => {
    User.deleteOne({_id: req.user._id}, (err, user) => {
        if (err) {
            return res.status(400).json({err})
        }
        res.status(200).json({
            success: true
        })
    })
}

exports.logoutUser = (req, res) => {
    User.updateOne({_id: req.user._id}, {token: ''}, (err, user) => {
        if (err || !user) {
            res.status(400).json({
                err: 'User cannot be found'
            })
        }

        res.status(200).json({
            success: true
        })
    })
}

exports.checkUser = (req, res) => {
    const email =  req.body.email

    User.findOne({email}, (err, user) => {
        if (err || !user) {
            return res.status(400).json({err})
            
        }

        res.status(200).json({
            success: true
        })
    })
}



exports.addToCart = (req, res) => {

    if (req.body.cart) {
        User.findOne({_id: req.user._id})
        .exec((err, user) => {
            req.body.cart.map((itemCart, i) => {
                let duplicate = false
                const findArr = user.cart.find((product) => {
                    let productId = String(itemCart.id)
                    let id = String(product.item)
                    return productId === id
                })
              
                if (findArr) {
                    User.findOneAndUpdate({_id: req.user._id, "cart.item":mongoose.Types.ObjectId(itemCart.id)},
                    {"cart.$.quantity": parseInt(itemCart.quantity)},
                    {new: true},
                    (err, userInfo) => {
                        if(err) return res.json({success:false, err});
                         
                    })
                   
                } else {
                    User.findOneAndUpdate({_id: req.user._id}, {$push: { cart: {
                        item: mongoose.Types.ObjectId(itemCart.id),
                        quantity: parseInt(itemCart.quantity)
                    }}}, {new: true}, (err, userInfo) => {
                        if(err) return res.json({success:false, err});
                   
                    })
                }
            })
            if(err) return res.json({success:false, err});
            res.json({success: true})

        })
    } else {
        User.findOne({_id: req.user._id})
        .exec((err, user) => {
            const findArr = user.cart.find((product) => {
                let productId = req.query.productId
                let id = String(product.item)
                return productId === id
            })
    
            if (findArr) {
                if (req.query.quantity) {
                    User.findOneAndUpdate({_id: req.user._id, "cart.item":mongoose.Types.ObjectId(req.query.productId)},
                    {"cart.$.quantity": parseInt(req.query.quantity)},
                    {new: true},
                    (err, userInfo) => {
                        if(err) return res.json({success:false, err});
                            res.json(userInfo.cart)
                    })
                } else {
                    User.findOneAndUpdate({_id: req.user._id, "cart.item":mongoose.Types.ObjectId(req.query.productId)},
                    {$inc: {"cart.$.quantity": 1}},
                    {new: true},
                    (err, userInfo) => {
                        if(err) return res.json({success:false, err});
                            res.json(userInfo.cart)
                    })
                }
               
            } else {
                User.findOneAndUpdate({_id: req.user._id}, {$push: { cart: {
                    item: mongoose.Types.ObjectId(req.query.productId),
                    quantity: parseInt(req.query.quantity) || 1
                }}}, {new: true}, (err, userInfo) => {
                    if(err) return res.json({success:false, err});
                        res.json(userInfo.cart)
                })
            }
        })
    }
}

exports.removeFromCart = (req, res) => {
    User.findOneAndUpdate(
        {_id: req.user._id},
        {$pull: {cart: {item: mongoose.Types.ObjectId(req.query.productId)}}},
        { new: true },
        (err, user) => {
            if (err) return res.status(400).json({success: false, err})
            res.status(200).json(user.cart)
        }
    )
}

exports.getCartItem = (req, res) => {
    
    res.status(200).json({
        cartItems: req.user.cart
    })
}

exports.getProductFromCart = (req, res) => {
    let array = req.body.cart.map((item, i) => mongoose.Types.ObjectId(item.id))
    Product.find({_id: {$in: array}})
    .select('name year fixed_price price')
    .exec((err, products) => {
        
        if (err) return res.status(400).json({success: false, err})
        let cartItems = []
        req.body.cart.map((item, i) => {
            
            products.forEach((product, i) => {
                if (String(item.id) === String(product._id)) {
                   
                    cartItems.push({
                        item: product._doc,
                        quantity: item.quantity
                    })
                } 
            })
        })
        cartItems = cartItems.reverse()
        res.json({cartItems})
    })
}

exports.successBuy = (req, res) => {
    let history = [];
    let transactionData = {}

    // user history
    console.log(req.body.cartDetail)
    req.body.cartDetail.forEach((item)=>{
        history.push({
            dateOfPurchase: Date.now(),
            name: item.item.name,
            year: item.item.year,
            id: item.item._id,
            price: item.item.fixed_price || item.item.price,
            quantity: item.quantity,
            paymentId: req.body.paymentData.paymentID
        })
    })


    // PAYMENTS DASH
    transactionData.user = {
        id: req.user._id,
        name: req.user.name,
        lastname: req.user.lastname,
        email: req.user.email
    }
    transactionData.data = req.body.paymentData;
    transactionData.product = history;

    User.findOneAndUpdate(
        { _id: req.user._id },
        { $push:{ history: history }, $set:{ cart:[] } },
        { new: true },
        (err,user)=>{
            if(err) return res.json({success:false,err});

            const payment = new Payment(transactionData);
            payment.save((err,doc)=>{
                if(err) return res.json({success:false,err});
                let products = [];
                doc.product.forEach(item=>{
                    products.push({id:item.id, quantity:item.quantity})
                 })
              
                async.eachSeries(products,(item, callback)=>{ 
                    Product.update(
                        {_id: item.id},
                        { $inc:{
                            "sold": item.quantity
                        }},
                        {new:false},
                        callback
                    )
                },(err)=>{
                    if(err) return res.json({success:false,err})
                    res.status(200).json({
                        success:true,
                        cart: user.cart,
                        cartDetail:[]
                    })
                })
            });
        }
    )
}