const crypto = require('crypto');
const connection = require('../database/connection');

 // deixar visivele acessivel as funçoes 
module.exports = {

    async index(request, response) {
        // await para esperar realizar o select
        // a consulta retorna um array
        const ongs = await connection('ongs').select('*');
    
        return response.json(ongs);
    },

    async create(request, response) {
        const { name, email, whatsapp, city, uf } = request.body;

        // gerar um id aletatorio 
        const id = crypto.randomBytes(4).toString('HEX');
        
        // com o await ele espera realizar a instrução, no caso o insert, para continuar
        await connection('ongs').insert({
            id,
            name,
            email,
            whatsapp,
            city,
            uf,
        });

        return response.json({ id });
    }
} 