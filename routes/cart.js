const express = require('express');
const router = express.Router();

// Url is /cart/item/add
router.post('/item/add', function(req, res, next) {  
  const itemId = req.query.itemId;

  if (!req.session.cart) {
    req.session.cart = [];
  }

  if (!req.session.cart.includes(itemId)) {
    req.session.cart.push(itemId);
  }
  
  res.status(200).send("Item Added");
});

module.exports = router;