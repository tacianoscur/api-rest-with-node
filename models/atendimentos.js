const axios = require('axios');
const moment = require('moment');
const connection = require('../infra/database/connection');
const repositorio = require('../repositories/atendimentos');

class Atendimento {
    constructor() {
        this.dataValida = (data, dataCriacao) => moment(data).isSameOrAfter(dataCriacao);
        this.clienteValido = (tamanho) =>  tamanho == 11;
        this.valida = (params) => {
            this.validacoes.filter(
                field => {
                    const { nome } = field;
                    const param = params[nome];

                    return !field.valido(param);
                }
            );
        };
        this.validacoes = [
            {
                name: 'data',
                valido: this.dataValida,
                message: 'Data deve ser maior ou igual a data atual!'
            },
            {
                name: 'cliente',
                valido: this.clienteValido,
                mensagem: 'Cpf deve ter 11 caracteres!'
            }
        ];
    }

    adiciona(atendimento) {
        const dataCriacao = moment().format('YYYY-MM-DD HH:mm:ss');
        const data = moment(atendimento.data, 'DD/MM/YYYY').format('YYYY-MM-DD HH:mm:ss');

        const params = {
            data: {
                data,
                dataCriacao
            },
            cliente: {
                tamanho: atendimento.cliente.length
            }
        };

        const errors = this.valida(params);
        const existemErros = errors.length;

        if (existemErros) {
            return new Promise((resolve, reject) => {
                reject(errors);
            });
        } else {
            const atendimentoDatado = { ...atendimento, dataCriacao, data };

            return repositorio.adiciona(atendimentoDatado)
                .then((results) => {
                    const id = results.insertId;
                    return ({ ...atendimento, id });
                });
        }
    }

    consulta() {
        return repositorio.consulta()
            .then((results) => {
                return results;
            });
    }

    consultaId(id) {
        return repositorio.consultaId(id)
            .then(async (results) => {
                const atendimento = results[0];
                const cpf = atendimento.cliente;

                const { data } = await axios.get(`http://localhost:8082/${cpf}`);
                atendimento.cliente = data;
                return atendimento;
            });
    }

    altera(id, values) {

        return repositorio.altera(id, values)
            .then(results => {
                return { ...values, id};
        });
    }

    remove(id) {
        return repositorio.remove(id)
            .then(results => {
                return { id };
            })
    }
}

module.exports = new Atendimento;