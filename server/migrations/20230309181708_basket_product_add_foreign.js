/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    return knex.schema.table("basket_product", table => {
        table.foreign("product").references("product.id")
        table.foreign("basket").references("basket.id")
      })
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
    return knex.schema.table("basket_product", table => {
        table.dropForeign("product")
        table.dropForeign("basket")
    })
};
