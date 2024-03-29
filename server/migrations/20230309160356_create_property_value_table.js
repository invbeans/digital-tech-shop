/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    return knex.schema.createTable("property_value", table => {
        table.increments("id").primary()
        table.integer("property").notNullable().references("id").inTable("property").onUpdate("CASCADE").onDelete("CASCADE")
        table.string("value").notNullable()
      })
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
    return knex.schema.dropTable("property_value")
};
