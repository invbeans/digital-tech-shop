/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    return knex.schema.createTable("return_product", table => {
        table.increments("id").primary()
        table.integer("return_application").notNullable().references("id").inTable("return_application")
        table.integer("product").notNullable().references("id").inTable("product")
      })
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
    return knex.schema.dropTable("return_product")
};
