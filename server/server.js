const express = require('express');
const config = require('./config/config');
const cors = require('cors');
const app = express();

const products = require('./routes/product');

const port = process.env.PORT || config.PORT;

app.use(cors());

app.use('/api/products', products);

app.listen(port, () => {
    console.log(`Server initialized at port ${port}`);
});

module.exports = app;