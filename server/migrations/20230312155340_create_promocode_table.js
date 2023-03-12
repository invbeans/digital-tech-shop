/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    return knex.schema.createTable("promocode", table => {
        table.increments("id").primary()
        table.string("text", 30).notNullable()
        table.integer("percent").notNullable()
        table.boolean("is_active").defaultTo(true).notNullable()
      })
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
    return knex.schema.dropTable("promocode")
};
