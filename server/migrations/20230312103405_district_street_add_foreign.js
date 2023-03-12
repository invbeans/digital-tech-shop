/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    return knex.schema.table("district_street", table => {
        table.foreign("district_city").references("district_city.id")
        table.foreign("street").references("street.id")
      })
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
    return knex.schema.table("district_street", table => {
        table.dropForeign("district_city")
        table.dropForeign("street")
    })
};
