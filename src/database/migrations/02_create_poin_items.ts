import Knex from "knex";

export async function up(knex: Knex) {
    return knex.schema.createTable("point_items", (table) => {
        table.increments("id").primary();
        table
            .integer("point_id")
            .notNullable()
            .references("id") // informamos que esse campo faz uma referencia (chave estrangeira) ao campo "id" na tabela "points"
            .inTable("points"); // aqui está a tabela para fazer a referencia
        // Ou seja, todo "point_id" nesta tabela TEM QUE SER um id válido na tabela points
        table
            .integer("item_id")
            .notNullable()
            .references("id")
            .inTable("items");
    });
}
export async function down(knex: Knex) {
    return knex.schema.dropTable("items");
}
