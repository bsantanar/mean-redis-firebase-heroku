const express = require('express');
const config = require('./config/config');
const path = require('path');
const cors = require('cors');
const app = express();

const products = require('./routes/product');

const port = process.env.PORT || config.PORT;

app.use(cors());

// Set Static Folder
app.use(express.static(path.join(__dirname, '/../public')));
app.use('/api/products', products);

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'public/index.html'));
  });

app.listen(port, () => {
    console.log(`Server initialized at port ${port}`);
});

module.exports = app;