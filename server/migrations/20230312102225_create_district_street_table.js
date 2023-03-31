/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    return knex.schema.createTable("district_street", table => {
        table.increments("id").primary()
        table.integer("district_city").notNullable().references("id").inTable("district_city").onUpdate("CASCADE").onDelete("CASCADE")
        table.integer("street").notNullable().references("id").inTable("street").onUpdate("CASCADE").onDelete("CASCADE")
      })
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
    return knex.schema.dropTable("district_street")
};
