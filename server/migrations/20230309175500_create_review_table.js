/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    return knex.schema.createTable("review", table => {
        table.increments("id").primary()
        table.integer("user").notNullable()
        table.integer("product").notNullable()
        table.integer("points").notNullable()
        table.dateTime("date").notNullable()
        table.string("text", 500).notNullable()
      })
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
    return knex.schema.dropTable("review")
};
