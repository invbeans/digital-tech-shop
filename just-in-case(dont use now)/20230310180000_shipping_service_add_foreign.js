/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    return knex.schema.table("shipping_service", table => {
        table.foreign("shipping_method").references("shipping_method.id")
      })
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
    return knex.schema.table("shipping_service", table => {
        table.dropForeign("shipping_method")
    })
};
