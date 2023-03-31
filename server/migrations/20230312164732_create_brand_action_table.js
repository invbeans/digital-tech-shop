/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    return knex.schema.createTable("brand_action", table => {
        table.integer("action").primary().notNullable().references("id").inTable("action").onUpdate("CASCADE").onDelete("CASCADE")
        table.integer("manufacturer").notNullable().references("id").inTable("manufacturer").onUpdate("CASCADE").onDelete("CASCADE")
      })
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
    return knex.schema.dropTable("brand_action")
};
