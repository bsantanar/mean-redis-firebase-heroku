const axios = require('axios').default;

axios.defaults.baseURL = 'https://simple.ripley.cl/api/v2/products';

module.exports.getMultipleProductsBySku = (stringSku) => {
    return new Promise((resolve, reject) => {
        axios.get(`?partNumbers=${stringSku}`).then( products => {
            resolve(products);
        }).catch(err => {
            console.log(err);
            reject(err);
        });
    });
}

module.exports.getProductBySku = (sku) => {
    return new Promise((resolve, reject) => {
        axios.get(sku).then( product => {
            resolve(product);
        }).catch(err => {
            console.log(err);
            reject(err);
        });
    });
}