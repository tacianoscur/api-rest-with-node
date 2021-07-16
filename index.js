const customExpress = require('./config/customExpress');
const connection = require('./infra/database/connection');
const Tabelas = require('./infra/database/tables');

connection.connect((error) => {
    if (error) {
        console.log(error);
    } else {
        console.log('Conectado com o banco com sucesso!');

        Tabelas.init(connection);
        const app = customExpress();
        app.listen('3000', () => {
            console.log('Servidor rodando na porta 3000.');
        });
    }
});
