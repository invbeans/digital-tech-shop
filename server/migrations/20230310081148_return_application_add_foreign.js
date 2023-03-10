/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    return knex.schema.table("return_application", table => {
        table.foreign("user").references("user.id")
        table.foreign("order").references("order.id")
      })
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
    return knex.schema.table("return_application", table => {
        table.dropForeign("user")
        table.dropForeign("order")
    })
};
