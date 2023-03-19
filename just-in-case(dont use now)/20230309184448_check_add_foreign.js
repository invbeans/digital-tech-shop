/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    return knex.schema.table("check", table => {
        table.foreign("order").references("order.id")
        table.foreign("payment_method").references("payment_method.id")
      })
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
    return knex.schema.table("check", table => {
        table.dropForeign("order")
        table.dropForeign("payment_method")
    })
};
