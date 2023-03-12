/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    return knex.schema.createTable("action", table => {
        table.increments("id").primary()
        table.string("name").notNullable()
        table.date("date_begin").notNullable()
        table.date("date_end").notNullable()
        table.integer("percent").notNullable()
        table.string("image")
        table.integer("action_type").notNullable()
      })
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
    return knex.schema.dropTable("action")
};
