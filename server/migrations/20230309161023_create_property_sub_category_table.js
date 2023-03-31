/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    return knex.schema.createTable("property_sub_category", table => {
        table.increments("id").primary()
        table.integer("property").notNullable().references("id").inTable("property").onUpdate("CASCADE").onDelete("CASCADE")
        table.integer("sub_category").notNullable().references("id").inTable("sub_category").onUpdate("CASCADE").onDelete("CASCADE")
      })
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
    return knex.schema.dropTable("property_sub_category")
};
