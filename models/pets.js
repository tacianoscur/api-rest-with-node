const connection = require('../infra/database/connection');
const uploadFiles = require('../infra/files/uploadFiles');

class Pet {
    adiciona(pet, res) {
        const sql = 'INSERT INTO pets SET ?';

        uploadFiles(pet.imagem, pet.nome, (erro, caminhoArquivo) => {
            if (erro) {
                res.status(400).json({ erro });
            } else {
                const novoPet = {
                    nome: pet.nome,
                    imagem: caminhoArquivo
                }
    
                connection.query(sql, novoPet, (error) => {
                    if (error) {
                        res.status(400).json(error);
                    } else {
                        res.status(201).json(novoPet);
                    }
                });

            }
        })
    }
}

module.exports = new Pet;