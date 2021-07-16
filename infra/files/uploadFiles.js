const fs = require('fs');
const path = require('path');

module.exports = (caminho, nomeArquivo, callbackImagemCriada) => {
    const tiposValidos = [
        'jpg',
        'png',
        'jpeg'
    ];
    const tipo = path.extname(caminho);
    const tipoValido = tiposValidos.indexOf(tipo.substring(1)) !== -1;
    
    if (tipoValido) {
        const caminhoArquivo = `./assets/images/${nomeArquivo}${tipo}`;

        fs.createReadStream(caminho)
            .pipe(fs.createWriteStream(caminhoArquivo))
            .on('finish', () => {
                callbackImagemCriada(false, caminhoArquivo)
            });
    } else {
        const erro = 'Tipo é inválido!';
        callbackImagemCriada(erro);
    }
}