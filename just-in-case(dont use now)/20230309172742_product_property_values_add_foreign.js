/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    return knex.schema.table("product_property_values", table => {
        table.foreign("product").references("product.id")
        table.foreign("property_value").references("property_value.id")
      })
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
    return knex.schema.table("product_property_values", table => {
        table.dropForeign("product")
        table.dropForeign("property_value")
    })
};
