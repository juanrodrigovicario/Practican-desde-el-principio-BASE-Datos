const express = require('express');
const app = express();
const port = 3000;
app.use(express.json())

app.listen(port, console.log(`app ejecutandose en: http://localhost:${port}`))

let id = 3
let phones = [
    {
        id:1,
        brand:'iphone',
        price:1100
    },
    {
        id:2,
        brand:'samsung',
        price:700
    }
]

app.get('/phones', (req,res) => {
    res.json(phones)
})

app.get('/phones/:id', (req,res) => {
    const phone = phones.find(phone => phone.id === +req.params.id)
    res.json(phone)
})

app.post('/phones', (req,res) => {
    const newPhone = {
        id:id++,
        brand: req.body.brand,
        price: req.body.price
    }
    phones = phones.concat(newPhone)
    res.json(newPhone)
})

app.put('/phones/:id', (req,res) => {
    const newPhone = {
        id: +req.params.id,
        brand: req.body.brand,
        price:req.body.price
    }
    
    phones = phones.map(phone => phone.id === +req.params.id? newPhone : phone)
    console.log('put')
    res.status(204).end()
})

// app.get('/phones/price/:price', (req,res) => {
//     const menorPrice = phones.filter( phone => phone.price < +req.params.price)
//     res.json(menorPrice)
// })

app.get('/phones/price', (req,res) => {
    const maxPrice = +req.query.price
    let menorPrice = maxPrice? phones.filter( phone => phone.price < maxPrice) : phones
    res.json(menorPrice)
})

app.delete('/phones/:id', (req,res) => {
    console.log(req.params.id);
    phones = phones.filter(phone => phone.id !== +req.params.id)
    res.status(201).json(phones)
})

