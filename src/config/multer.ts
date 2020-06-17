import multer from "multer";
import path from "path";
import crypto from "crypto";

export default {
    // Usando o Multer para lidar com a escrita de arquivos no sistema

    storage: multer.diskStorage({
        // a propriedade "destination" recebe o path com o diretório onde os arquivos serão salvos
        destination: path.resolve(__dirname, "..", "..", "uploads"),
        // Filename é o nome que daremos ao arquivo
        filename(request, file, callback) {
            // A funçãp "crypto.randomBytes(6)" gera um número randomico de 6 bytes
            // Em seguida a gente converte ele para uma string em Hexadecimal
            const hash = crypto.randomBytes(6).toString("hex");

            // Agora a gente vai criar o nome final do arquivo
            const finalFilename = `${hash}-${file.originalname}`;
            // e.g: 123456-meuArquivo.jpg

            callback(null, finalFilename);
        },
    }),
};
