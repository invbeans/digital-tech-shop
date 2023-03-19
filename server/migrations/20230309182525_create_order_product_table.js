/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    return knex.schema.createTable("order_product", table => {
        table.increments("id").primary()
        table.integer("product").notNullable().references("id").inTable("product")
        table.integer("order").notNullable().references("id").inTable("order")
      })
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
    return knex.schema.dropTable("order_product")
};
