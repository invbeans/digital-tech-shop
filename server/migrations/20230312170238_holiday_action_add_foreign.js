/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    return knex.schema.table("holiday_action", table => {
        table.foreign("action").references("action.id")
        table.foreign("sub_category").references("sub_category.id")
      })
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
    return knex.schema.table("holiday_action", table => {
        table.dropForeign("action")
        table.dropForeign("sub_category")
    })
};
