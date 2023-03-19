/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    return knex.schema.createTable("question", table => {
        table.increments("id").primary()
        table.integer("user").notNullable().references("id").inTable("user")
        table.integer("product").notNullable().references("id").inTable("product")
        table.dateTime("date").notNullable()
        table.string("text", 400).notNullable()
      })
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
    return knex.schema.dropTable("question")
};
