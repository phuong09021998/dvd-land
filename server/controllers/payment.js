const { Payment } = require('../models/payment')




exports.listOrders = (req, res) => {
  Payment.find()
  .exec((err, orders) => {
      if (err) return res.status(400).json({
          err: 'No orders found'
      })
      orders = orders.reverse()
      return res.status(200).json({orders})
  })
}
