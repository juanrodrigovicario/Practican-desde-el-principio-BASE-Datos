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
app.get('/', function (req, res) {
  res.json(phones);
});
app.get('/:phone', function (req, res) {
  res.json(phones[req.params.phone]);
});
app.post('/', function (req, res) {
  var newPhone = {
    id: id++,
    brand: req.body.brand,
    price: req.body.price
  };
  phones = phones.concat(newPhone);
  res.json(newPhone);
}); // app.put('/:id', (req,res) => {
//     phones = phones.map()
// })

app.get('/price/:price', function (req, res) {
  var menorPrice = phones.filter(function (phone) {
    return phone.price < req.params.price;
  });
  res.status(200).send(menorPrice);
});
app["delete"]('/phone/:id', function (req, res) {
  console.log(req.params.id);
  phones = phones.filter(function (phone) {
    return phone.id !== req.params.id;
  });
  res.json(phones);
});