const query = require('../infra/database/queries');

class Atendimento {
    adiciona(atendimento) {
        const sql = 'INSERT INTO atendimentos SET ?';
        return query(sql, atendimento);
    }

    consulta() {
        const sql = 'SELECT * FROM atendimentos';
        return query(sql);
    }

    consultaId(id) {
        const sql = `SELECT * FROM atendimentos WHERE id = ${id}`;
        return query(sql);
    }

    altera(id, values) {
        const sql = `UPDATE atendimentos SET ? WHERE id = ${id}`;
        return query(sql, values);
    }

    remove(id) {
        const sql = `DELETE FROM atendimentos WHERE id = ${id}`;
        return query(sql);
    }
}

module.exports = new Atendimento;