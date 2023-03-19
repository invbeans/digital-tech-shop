/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    return knex.schema.createTable("holiday_action", table => {
        table.increments("id").primary()
        table.integer("action").notNullable().references("id").inTable("action")
        table.integer("sub_category").notNullable()
      })
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
    return knex.schema.dropTable("holiday_action")
};
