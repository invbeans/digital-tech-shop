/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    return knex.schema.createTable("review", table => {
        table.increments("id").primary()
        table.integer("user").notNullable().references("id").inTable("user").onUpdate("CASCADE").onDelete("CASCADE")
        table.integer("product").notNullable().references("id").inTable("product").onUpdate("CASCADE").onDelete("CASCADE")
        table.integer("points").notNullable()
        table.dateTime("date").notNullable()
        table.string("text", 500).notNullable()
      })
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
    return knex.schema.dropTable("review")
};
