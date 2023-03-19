/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    return knex.schema.createTable("order_shipping", table => {
        table.integer("order").primary().notNullable().references("id").inTable("order")
        table.integer("shipping_service").notNullable().references("id").inTable("shipping_service")
        table.integer("adress").notNullable().references("id").inTable("adress")
        table.integer("pickup_point_type").notNullable().references("id").inTable("pickup_point_type")
      })
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
    return knex.schema.dropTable("order_shipping")
};
