/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    return knex.schema.createTable("city", table => {
        table.increments("id").primary()
        table.integer("region").notNullable().references("id").inTable("region").onUpdate("CASCADE").onDelete("CASCADE")
        table.string("name").notNullable()
      })
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
    return knex.schema.dropTable("city")
};
