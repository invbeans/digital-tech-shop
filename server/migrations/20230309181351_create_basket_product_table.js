/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    return knex.schema.createTable("basket_product", table => {
        table.increments("id").primary()
        table.integer("basket").notNullable().references("user").inTable("basket")
        table.integer("product").notNullable().references("id").inTable("product")
      })
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
    return knex.schema.dropTable("basket_product")
};
