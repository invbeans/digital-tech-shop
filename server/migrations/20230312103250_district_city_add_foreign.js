/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    return knex.schema.table("district_city", table => {
        table.foreign("city").references("city.id")
        table.foreign("district").references("district.id")
      })
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
    return knex.schema.table("district_city", table => {
        table.dropForeign("city")
        table.dropForeign("district")
    })
};
