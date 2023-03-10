/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    return knex.schema.table("shipping_history", table => {
        table.foreign("order").references("order.id")
        table.foreign("shipping_status").references("shipping_status.id")
      })
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
    return knex.schema.table("shipping_history", table => {
        table.dropForeign("order")
        table.dropForeign("shipping_status")
    })
};
