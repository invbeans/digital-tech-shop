/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    return knex.schema.table("answer", table => {
        table.foreign("question").references("question.id")
        table.foreign("user").references("user.id")
      })
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
    return knex.schema.table("answer", table => {
        table.dropForeign("question")
        table.dropForeign("user")
    })
};
