/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    return knex.schema.table("adress", table => {
        table.foreign("region").references("region.id")
        table.foreign("street_type").references("street_type.id")
      })
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
    return knex.schema.table("adress", table => {
        table.dropForeign("region")
        table.dropForeign("street_type")
    })
};
