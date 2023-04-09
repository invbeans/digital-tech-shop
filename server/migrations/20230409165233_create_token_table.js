/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
  return knex.schema.createTable("token", table => {
    table.integer("user").primary().notNullable().references("id").inTable("user").onUpdate("CASCADE").onDelete("CASCADE")
    table.string("refresh_token").notNullable()
  })
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
  return knex.schema.dropTable("token")
};
