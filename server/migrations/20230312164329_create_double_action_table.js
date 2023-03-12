/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    return knex.schema.createTable("double_action", table => {
        table.integer("action").primary().notNullable()
        table.integer("full_price_product").notNullable()
        table.integer("discount_product").notNullable()
      })
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
    return knex.schema.dropTable("double_action")
};
