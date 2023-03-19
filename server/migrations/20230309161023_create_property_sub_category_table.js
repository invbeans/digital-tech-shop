/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    return knex.schema.createTable("property_sub_category", table => {
        table.increments("id").primary()
        table.integer("property").notNullable().references("id").inTable("property")
        table.integer("sub_category").notNullable().references("id").inTable("sub_category")
      })
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
    return knex.schema.dropTable("property_sub_category")
};
