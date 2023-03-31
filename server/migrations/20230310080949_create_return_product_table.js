/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    return knex.schema.createTable("return_product", table => {
        table.increments("id").primary()
        table.integer("return_application").notNullable().references("id").inTable("return_application").onUpdate("CASCADE").onDelete("CASCADE")
        table.boolean("proper_quality").defaultTo(true).notNullable()
        table.integer("product").notNullable().references("id").inTable("product").onUpdate("CASCADE").onDelete("CASCADE")
      })
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
    return knex.schema.dropTable("return_product")
};
