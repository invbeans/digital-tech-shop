/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    return knex.schema.createTable("basket", table => {
        table.integer("user").primary().notNullable().references("id").inTable("user").onUpdate("CASCADE").onDelete("CASCADE")
        table.date("begin_date")
      })
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
    return knex.schema.dropTable("basket")
};
