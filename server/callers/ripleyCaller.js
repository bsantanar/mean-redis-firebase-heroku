const axios = require('axios').default;

axios.defaults.baseURL = 'https://simple.ripley.cl/api/v2/products';

module.exports.getMultipleProductsBySku = (stringSku) => {
    return new Promise((resolve, reject) => {
        axios.get(`?partNumbers=${stringSku}`).then( products => {
            resolve(products);
        }).catch(err => {
            if( err.response ){
                console.log(err.response.data);
            }
            reject(err);
        });
    });
}

module.exports.getProductBySku = (sku) => {
    return new Promise((resolve, reject) => {
        axios.get(sku).then( product => {
            resolve(product);
        }).catch(err => {
            if( err.response ){
                console.log(err.response.data);
            }
            reject(err);
        });
    });
}