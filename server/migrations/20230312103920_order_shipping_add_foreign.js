/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    return knex.schema.table("order_shipping", table => {
        table.foreign("order").references("order.id")
        table.foreign("shipping_service").references("shipping_service.id")
        table.foreign("adress").references("adress.id")
        table.foreign("pickup_point_type").references("pickup_point_type.id")
      })
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
    return knex.schema.table("order_shipping", table => {
        table.dropForeign("order")
        table.dropForeign("shipping_service")
        table.dropForeign("adress")
        table.dropForeign("pickup_point_type")
    })
};
