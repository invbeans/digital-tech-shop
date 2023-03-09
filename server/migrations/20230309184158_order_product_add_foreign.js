/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    return knex.schema.table("order_product", table => {
        table.foreign("product").references("product.id")
        table.foreign("order").references("order.id")
      })
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
    return knex.schema.table("order_product", table => {
        table.dropForeign("product")
        table.dropForeign("order")
    })
};
