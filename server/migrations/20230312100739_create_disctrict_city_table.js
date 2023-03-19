/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    return knex.schema.createTable("district_city", table => {
        table.increments("id").primary()
        table.integer("city").notNullable().references("id").inTable("city")
        table.integer("district").notNullable().references("id").inTable("district")
      })
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
    return knex.schema.dropTable("district_city")
};
