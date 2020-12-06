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

app.get('/', (req,res) => {
    res.json(phones)
})

app.get('/:phone', (req,res) => {
    res.json(phones[req.params.phone])
})

app.post('/', (req,res) => {
    const newPhone = {
        id:id++,
        brand: req.body.brand,
        price: req.body.price
    }
    phones = phones.concat(newPhone)
    res.json(newPhone)
})

// app.put('/:id', (req,res) => {
//     phones = phones.map()
// })

app.get('/price/:price', (req,res) => {
    const menorPrice = phones.filter( phone => phone.price < req.params.price)
    res.status(200).send(menorPrice)
})

app.delete('/phone/:id', (req,res) => {
    console.log(req.params.id);
    phones = phones.filter(phone => phone.id !== req.params.id)
    res.json(phones)
})
