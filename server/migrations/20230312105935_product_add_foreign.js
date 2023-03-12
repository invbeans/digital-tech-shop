/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    return knex.schema.table("product", table => {
        table.foreign("manufacturer").references("manufacturer.id")
        table.foreign("supplier").references("supplier.id")
      })
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
    return knex.schema.table("product", table => {
        table.dropForeign("manufacturer")
        table.dropForeign("supplier")
    })
};
