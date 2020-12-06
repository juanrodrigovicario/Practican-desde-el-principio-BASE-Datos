"use strict";

var express = require('express');

var app = express();
var port = 3000;
app.use(express.json());
app.listen(port, console.log("app ejecutandose en: http://localhost:".concat(port)));
var id = 3;
var phones = [{
  id: 1,
  brand: 'iphone',
  price: 1100
}, {
  id: 2,
  brand: 'samsung',
  price: 700
}];
app.get('/phones', function (req, res) {
  res.json(phones);
});
app.get('/phones/:id', function (req, res) {
  var phone = phones.find(function (phone) {
    return phone.id === +req.params.id;
  });
  res.json(phone);
});
app.post('/phones', function (req, res) {
  var newPhone = {
    id: id++,
    brand: req.body.brand,
    price: req.body.price
  };
  phones = phones.concat(newPhone);
  res.json(newPhone);
});
app.put('/phones/:id', function (req, res) {
  var newPhone = {
    id: +req.params.id,
    brand: req.body.brand,
    price: req.body.price
  };
  phones = phones.map(function (phone) {
    return phone.id === +req.params.id ? newPhone : phone;
  });
  console.log('put');
  res.status(204).end();
}); // app.get('/phones/price/:price', (req,res) => {
//     const menorPrice = phones.filter( phone => phone.price < +req.params.price)
//     res.json(menorPrice)
// })

app.get('/phones/price', function (req, res) {
  var maxPrice = +req.query.price;
  var menorPrice = maxPrice ? phones.filter(function (phone) {
    return phone.price < maxPrice;
  }) : phones;
  res.json(menorPrice);
});
app["delete"]('/phones/:id', function (req, res) {
  console.log(req.params.id);
  phones = phones.filter(function (phone) {
    return phone.id !== +req.params.id;
  });
  res.status(201).json(phones);
});