const Atendimento = require('../models/atendimentos');

module.exports = app => {
    app.post('/atendimentos', (req, res) => {
        const atendimento = req.body;

        Atendimento.adiciona(atendimento)
            .then((atendimentoCadastrado) => {
                res.status(201).json(atendimentoCadastrado);
            })
            .catch((errors) => {
                res.status(400).json(errors)
            });
    });

    app.get('/atendimentos', (req, res) => {
        Atendimento.consulta()
            .then((results) => {
                res.json(results);
            })
            .catch(errors => res.status(400).json(errors));
    });

    app.get('/atendimentos/:id', (req, res) => {
        const id = parseInt(req.params.id);
        Atendimento.consultaId(id)
            .then(result => {
                res.json(result);
            })
            .catch(errors => res.status(400).json(errors));
    });

    app.patch('/atendimentos/:id', (req, res) => {
        const id = parseInt(req.params.id);
        const values = req.body;

        Atendimento.altera(id, values)
            .then(result => {
                res.json(result);
            })
            .catch(errors => res.status(400).json(errors));
    });

    app.delete('/atendimentos/:id', (req, res) => {
        const id = parseInt(req.params.id);

        Atendimento.remove(id)
            .then(result => {
                res.json(result);
            })
            .catch(errors => res.status(400).json(errors));
    })
};