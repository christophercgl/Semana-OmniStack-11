const connection = require('../database/connection');

// para pegar os valores q são enviados usa o request 
// para enviar as respostas usa o response

module.exports = {
    async index(request, response) {
        // pegar o parametro page da url
        // se n tiver fica por default 1
        const { page = 1 } = request.query;

        // [count] pega a primeira posição do array e atribui a const count
        const [count] = await connection('incidents').count();

        // offset para ignorar uma setar qtd de registro, trazer depois do 5, 10...
        const incidents = await connection('incidents')
            .join('ongs', 'ongs.id', '=', 'incidents.ong_id')
            .limit(5)
            .offset((page - 1) * 5)
            .select([
                'incidents.*', 
                'ongs.name',
                'ongs.email',
                'ongs.whatsapp',
                'ongs.city',
                'ongs.uf'
            ]);

        // passando para o Header da resposta o total de registros
        response.header('X-Total-Count', count['count(*)']);

        return response.json(incidents);
    },

    async create(request, response) {
        const { title, description, value } = request.body;
        // pegando o value da authorization que é passado no Header da requisição
        const ong_id = request.headers.authorization;

        // armazena o retorno dentro da variavel [id]
        const [id] = await connection('incidents').insert({
            title,
            description,
            value,
            ong_id,
        });

        return response.json({ id });
    },

    async delete(request, response) {
        const { id } = request.params;
        const ong_id = request.headers.authorization;

        // buscar o registro pelo id e retornar o primeiro
        const incident = await connection('incidents')
            .where('id', id)
            .select('ong_id')
            .first();

        if (incident.ong_id !== ong_id) {
            return response.status(401).json({ error: 'Operation not permitted' });
        }

        // deletar o registro
        await connection('incidents').where('id', id).delete();

        // status 204 diz q é um retorno q deu sucesso, mas sem conteudo para retorno
        // send para enviar a respota sem corpo, vazia
        return response.status(204).send();
    }
};