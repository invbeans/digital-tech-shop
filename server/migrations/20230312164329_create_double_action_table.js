/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    return knex.schema.createTable("double_action", table => {
        table.integer("action").primary().notNullable().references("id").inTable("action")
        table.integer("full_price_product").notNullable().references("id").inTable("product")
        table.integer("discount_product").notNullable().references("id").inTable("product")
      })
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
    return knex.schema.dropTable("double_action")
};
