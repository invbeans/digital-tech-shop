/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    return knex.schema.table("meta_user", table => {
        table.foreign("user").references("user.id")
        table.foreign("role").references("role.id")
      })
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
    return knex.schema.table("meta_user", table => {
        table.dropForeign("user")
        table.dropForeign("role")
    })
};
