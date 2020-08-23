const db = require('../config/db');

const cache = async (req, res, next) => {
    try {
        const key = req.params.key;
        const data = await db.get(key);
        if(data !== null){
            let hit = JSON.parse(data);
            console.log('Encontrado en el cache');
            return res.status(200).send({ok: true, message: 'Fetched from Redis', data: hit});
        }
        return next();
    } catch (e) {
        return res.status(500)
            .send({ ok: false, message: 'Internal Error' });
    }
}

module.exports = {cache};