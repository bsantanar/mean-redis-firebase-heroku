const express = require('express')
const router = express.Router();
const authMiddleware = require('../middlewares/validateToken');
const cacheMiddleware = require('../middlewares/cache');
const db = require('../config/db');
const ripleyCaller = require('../callers/ripleyCaller');

router.get('/bySku/:key', authMiddleware.checkToken, cacheMiddleware.cache, async (req, res) => {
    console.log('Consultando api ripley');
    try {
        const sku = req.params.key;
        let rnd = Math.floor(Math.random()*100);
        if(rnd <= 15){
            return res.status(400).json({ok: false, message: 'The Api has failed randomly.'})
        }
        const { data } = await ripleyCaller.getProductBySku(`/${sku}`);
        await db.setex(sku, JSON.stringify(data));
        return res.status(200).json({ ok:true, message: 'Fetched from ripley api', data});
    } catch (e) {
        return res.status(500).json({ok: false, message: 'Internal server Error', data: e.response.data})
    }
});

router.get('/:key', authMiddleware.checkToken, cacheMiddleware.cache, async (req, res) => {
    console.log('Consultando api ripley');
    try {
        const products = req.params.key;
        let rnd = Math.floor(Math.random()*100);
        if(rnd <= 15){
            return res.status(400).json({ok: false, message: 'The Api has randomly failed.'})
        }
        const { data } = await ripleyCaller.getMultipleProductsBySku(products);
        await db.setex(products, JSON.stringify(data));
        return res.status(200).json({ ok:true, message: 'Fetched from ripley api', data});
    } catch (e) {
        return res.status(500).json({ok: false, message: 'Internal server Error', data: e.response.data})
    }
});

module.exports = router;