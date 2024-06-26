const express = require('express');
const DbConnection = require('./config/db');
const productRouter = require('./routes/products.routes');
const CartProductRouter = require('./routes/cart.routes');
const cors = require('cors');
const OrderModel = require('./models/order.model');
const OrderRouter = require('./routes/order.routes');
const AddressRouter = require('./routes/address.routes');
const app = express();

require('dotenv').config()

const port = process.env.PORT

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({extended:false}))

app.get('/', (req, res)=>{
    res.send("welcome")
})

app.use('/address', AddressRouter)
app.use('/order', OrderRouter)
app.use('/product', productRouter)
app.use('/cart', CartProductRouter)


app.listen(port, ()=>{
    DbConnection(process.env.DB_URL)
    console.log('Server is running',port);
    console.log('connected to database');
})