/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    return knex.schema.table("double_action", table => {
        table.foreign("full_price_product").references("product.id")
        table.foreign("discount_product").references("product.id")
      })
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
    return knex.schema.table("double_action", table => {
        table.dropForeign("full_price_product")
        table.dropForeign("discount_product")
    })
};
