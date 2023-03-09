/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    return knex.schema.table("property_sub_category", table => {
        table.foreign("property").references("property.id")
        table.foreign("sub_category").references("sub_category.id")
      })
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
    return knex.schema.table("property_sub_category", table => {
        table.dropForeign("property")
        table.dropForeign("sub_category")
    })
};
