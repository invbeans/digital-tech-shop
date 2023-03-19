/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    return knex.schema.createTable("answer", table => {
        table.increments("id").primary()
        table.integer("user").notNullable().references("id").inTable("user")
        table.integer("question").notNullable().references("id").inTable("question")
        table.dateTime("date").notNullable()
        table.string("text", 400).notNullable()
      })
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
    return knex.schema.dropTable("answer")
};
