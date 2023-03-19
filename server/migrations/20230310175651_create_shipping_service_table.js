/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    return knex.schema.createTable("shipping_service", table => {
        table.increments("id").primary()
        table.string("name").notNullable()
        table.integer("shipping_method").notNullable().references("id").inTable("shipping_method")
        table.double("price").notNullable().checkPositive()
      })
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
    return knex.schema.dropTable("shipping_service")
};
