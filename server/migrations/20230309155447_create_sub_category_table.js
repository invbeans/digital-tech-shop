/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    return knex.schema.createTable("sub_category", table => {
        table.increments("id").primary()
        table.integer("main_category").notNullable().references("id").inTable("main_category").onUpdate("CASCADE").onDelete("CASCADE")
        table.string("name").notNullable().unique()
      })
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
    return knex.schema.dropTable("sub_category")
};
