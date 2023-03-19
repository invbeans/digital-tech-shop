/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    return knex.schema.table("return_product", table => {
        table.foreign("return_application").references("return_application.id")
        table.foreign("product").references("product.id")
      })
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
    return knex.schema.table("return_product", table => {
        table.dropForeign("return_application")
        table.dropForeign("product")
    })
};
