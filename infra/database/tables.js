class Tabelas {
    init(connection) {
        this.connection = connection;

        this.criarAtendimentos();
        this.criarPets();
    }

    criarAtendimentos() {
        const sql = 'CREATE TABLE IF NOT EXISTS atendimentos (id int NOT NULL AUTO_INCREMENT, cliente varchar(11) NOT NULL, pet varchar(20), servico varchar(20) NOT NULL, data datetime NOT NULL, dataCriacao datetime NOT NULL, status varchar(20) NOT NULL, observacoes text, PRIMARY KEY(id))';

        this.connection.query(sql, (error) => {
            if (error) {
                console.log(error);
            }
        });
    }

    criarPets() {
        const sql = 'CREATE TABLE IF NOT EXISTS Pets (id int NOT NULL AUTO_INCREMENT, nome varchar(20), imagem varchar(200), PRIMARY KEY (id))';

        this.connection.query(sql, (error) => {
            if (error) {
                console.log(error);
            }
        });
    }
}

module.exports = new Tabelas;