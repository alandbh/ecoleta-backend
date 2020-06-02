// Importando com letra maiuscula pra informar que estamos importando os Types da lib
import Knex from "knex";

export async function up(knex: Knex) {
    // criar tabela
    // "points" é o nome da entidade
    // table é o nome do argumento que passamos na função onde criamos os campos da tabela
    // "increments" é um tipo de dado que se auto-incrementa automaticamente. Útil par ase criar IDs
    // "Primary" é para informar que este campo é a chave primária da tabela
    // "notNullable" informa que o campo não pode ser nulo
    // 'uf', 2) o numero 2 é o comprimento da string. Ou seja, apenas 2 caracteres sao permitidos para cadastrar o estado (UF)
    return knex.schema.createTable("points", (table) => {
        table.increments("id").primary();
        table.string("image").notNullable();
        table.string("name").notNullable();
        table.string("email").notNullable();
        table.string("whatsapp").notNullable();
        table.decimal("latitude").notNullable();
        table.decimal("longitude").notNullable();
        table.string("city").notNullable();
        table.string("uf", 2).notNullable();
    });
}
export async function down(knex: Knex) {
    // deletar tabela
    return knex.schema.dropTable("point");
}
