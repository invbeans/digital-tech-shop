/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    return knex.schema.createTable("return_application", table => {
        table.increments("id").primary()
        table.integer("user").notNullable().references("id").inTable("user").onUpdate("CASCADE").onDelete("CASCADE")
        table.dateTime("date").notNullable()
        table.integer("order").notNullable().references("id").inTable("order").onUpdate("CASCADE").onDelete("CASCADE")
        table.string("text", 400).notNullable()
        table.boolean("approved").defaultTo(false)
      })
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
    return knex.schema.dropTable("return_application")
};
