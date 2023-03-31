/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    return knex.schema.createTable("product_image", table => {
        table.increments("id").primary()
        table.integer("product").notNullable().references("id").inTable("product").onUpdate("CASCADE").onDelete("CASCADE")
        table.string("image_link").notNullable()
      })
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
    return knex.schema.dropTable("product_image")
};
