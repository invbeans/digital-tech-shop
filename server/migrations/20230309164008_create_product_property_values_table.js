/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    return knex.schema.createTable("product_property_values", table => {
        table.increments("id").primary()
        table.integer("product").notNullable().references("id").inTable("product")
        table.integer("property_value").notNullable().references("id").inTable("property_value")
      })
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
    return knex.schema.dropTable("product_property_values")
};
