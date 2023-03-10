/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    return knex.schema.createTable("return_application", table => {
        table.increments("id").primary()
        table.integer("user").notNullable()
        table.dateTime("date").notNullable()
        table.integer("order").notNullable()
        table.boolean("proper_quality").defaultTo(true).notNullable()
        table.string("text", 400).notNullable()
      })
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
    return knex.schema.dropTable("return_application")
};
