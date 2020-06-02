import path from "path";

// Nao dá pra usar o "export default" pois o Knex nao suporta
module.exports = {
    client: "sqlite3",
    connection: {
        // os outros parametros depois do __dirname sao o caminho até chegar no arquivo database.sqlite, já que o __dirname retorna apenas o caminho da pasta onde ele se encontra
        filename: path.resolve(__dirname, "src", "database", "database.sqlite"),
    },
    migrations: {
        directory: path.resolve(__dirname, "src", "database", "migrations"),
    },
    useNullAsDefault: true,
};

// rodar isso no terminal
// npx knex migrate:latest --knexfile knexfile.ts migrate:latest
