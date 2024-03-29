/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    return knex.schema.createTable("user_profile", table => {
        table.integer("user").primary().notNullable().references("id").inTable("user").onUpdate("CASCADE").onDelete("CASCADE")
        table.string("firstname").notNullable()
        table.integer("points").notNullable()
      })
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
    return knex.schema.dropTable("user_profile")
};
