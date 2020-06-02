import knex from "knex";
import path from "path";

const connection = knex({
    client: "sqlite3",
    connection: {
        filename: path.resolve(__dirname, "database.sqlite"),
    },
    useNullAsDefault: true,
});

export default connection;

// Migrations
// São um histórico, ou "controle de versão" do nosso banco de dados
// É bom para projetos com mais pessoas juntas
