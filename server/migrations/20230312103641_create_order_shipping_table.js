/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    return knex.schema.createTable("order_shipping", table => {
        table.integer("order").primary().notNullable()
        table.integer("shipping_service").notNullable()
        table.integer("adress").notNullable()
        table.integer("pickup_point_type").notNullable()
      })
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
    return knex.schema.dropTable("order_shipping")
};
